package swim.simulator.agents;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.api.lane.MapLane;
import swim.concurrent.TimerRef;
import swim.structure.Value;
import swim.structure.Record;
import swim.uri.Uri;
import swim.simulator.configUtil.ConfigEnv;

/**
 * This Agent manages the main Simulator
 */
public class SimulatorAgent extends AbstractAgent {

    private Value config = ConfigEnv.config;
    private Integer totalVectorKeys = 0;
    private Integer currentVectorIndex = 0;
    private Integer lastVectorIndexSent = 0;
    private boolean isSimulatorRunning = false;
    private TimerRef simulationTimer;
    private TimerRef csvExportTimer;
    private Integer simLoopInterval = config.get("simLoopInterval").intValue();
    private Integer csvExportInterval = config.get("csvExportInterval").intValue();
    private String targetDirectory = config.get("csvOutFolder").stringValue();
    private static final int LOG_HISTORY_SIZE = 100;

    @SwimLane("apiQueryEnabled")
    ValueLane<Boolean> apiQueryEnabled;    

    @SwimLane("stateVectorKeys")
    MapLane<Integer, Long> stateVectorKeys;

    @SwimLane("addVectorKey")
    public CommandLane<Value> addVectorKey = this.<Value>commandLane()
        .onCommand((Value newVectorKey) -> {
            this.stateVectorKeys.put(this.totalVectorKeys, newVectorKey.longValue());
            this.totalVectorKeys++;
            
        });

    @SwimLane("removeVectorKey")
    public CommandLane<Value> removeVectorKey = this.<Value>commandLane()
        .onCommand((Value newVectorKey) -> {
            this.stateVectorKeys.remove(newVectorKey.longValue());
            this.totalVectorKeys--;
            
        });        

    /**
     * command to trigger sending the next set of airplane vector data to the app
     */
    @SwimLane("sendNextVector")
    public CommandLane<Value> sendNextVectorCommand = this.<Value>commandLane()
        .onCommand((Value newValue) -> {
            this.sendNextVector();
            this.sendTickUpdate();
        });

    /**
     * Command to start up the sim
     */
    @SwimLane("startSim")
    public CommandLane<Value> startSimCommand = this.<Value>commandLane()
        .onCommand((Value newValue) -> {
            this.startSimulator();
        });

    /**
     * Command to stop the Sim
     */
    @SwimLane("stopSim")
    public CommandLane<Value> stopSimCommand = this.<Value>commandLane()
        .onCommand((Value newValue) -> {
            this.stopSimulator();
        });

    /**
     * Command to send current tick counts to Sim and App
     */
    @SwimLane("updateTickCount")
    public CommandLane<Value> updateTickCountCommand = this.<Value>commandLane()
        .onCommand((Value newValue) -> {
            this.sendTickUpdate();
        });
    
    /**
     * Command to send static data (airports, weather) to App
     */
    @SwimLane("syncApp")
    public CommandLane<Value> syncAppCommand = this.<Value>commandLane()
        .onCommand((Value newValue) -> {
            command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Sync Static Data"));
            this.sendAppConfig();
            this.sendTickUpdate();
            command(Uri.parse("/bridge/airports"), Uri.parse("syncApp"), Value.absent());
            command(Uri.parse("/bridge/weather"), Uri.parse("syncApp"), Value.absent());
        });
    
    /**
     * Command lane to call reset Sim
     */
    @SwimLane("resetSim")
    public CommandLane<Value> resetSim = this.<Value>commandLane()
        .onCommand((Value newValue) -> {
            this.resetSim();
        });        

    /**
     * Map lane to hold Sim log data
     */
    @SwimLane("javaLogs")
    MapLane<Long, String> javaLog = this.<Long, String>mapLane()
        .didUpdate((key, newValue, oldValue) -> {
            if (this.javaLog.size() > LOG_HISTORY_SIZE) {
                this.javaLog.drop(this.javaLog.size() - LOG_HISTORY_SIZE);
            }
        });  

    /**
     * map lane to hold App log data
     */
    @SwimLane("appLogs")
    MapLane<Long, String> appLogs = this.<Long, String>mapLane()
        .didUpdate((key, newValue, oldValue) -> {
            if (this.appLogs.size() > LOG_HISTORY_SIZE) {
                this.appLogs.drop(this.appLogs.size() - LOG_HISTORY_SIZE);
            }
        });  
    
    /**
     * command to append log messages to the Sim log (shown in Wayback)
     */
    @SwimLane("addJavaLog")
    CommandLane<Value> addJavaLog = this.<Value>commandLane()
        .onCommand(t -> {
            final long now = System.currentTimeMillis();
            javaLog.put(now, t.stringValue());
        });           
               
    /**
     * command to append log messages to the App log (shown in Wayback)
     */
    @SwimLane("addAppLog")
    CommandLane<Value> addAppLog = this.<Value>commandLane()
        .onCommand(t -> {
            final long now = System.currentTimeMillis();
            appLogs.put(now, t.stringValue());
        }); 

    /**
     * command to toggle api query on/off
     */
    @SwimLane("setApiQueryState")
    CommandLane<Value> setApiQueryState = this.<Value>commandLane()
        .onCommand(t -> {
            this.apiQueryEnabled.set(t.booleanValue(false));
            command(Uri.parse("/bridge/opensky"), Uri.parse("queryApi"), Value.fromObject(t.booleanValue(false)));        
            command(Uri.parse("/bridge/weather"), Uri.parse("queryApi"), Value.fromObject(t.booleanValue(false)));
            this.sendTickUpdate();
        });           
                
    /**
     * Startup the Sim
     */
    private void startSimulator() {
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Start Sim"));

        this.isSimulatorRunning = true;
        this.sendAppConfig();
        this.sendNextVector();
        this.sendTickUpdate();
    }

    /**
     * stop Sim and update App
     */
    private void stopSimulator() {
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Stop Sim"));
        this.isSimulatorRunning = false;
        this.simulationTimer.cancel();
        this.sendTickUpdate();
        this.sendAppConfig();
    }

    /**
     * clear and reset all sim data in both Sim and App
     */
    private void resetSim() {
        if(this.isSimulatorRunning) {
            this.stopSimulator();
        }
        this.currentVectorIndex = 0;
        this.sendTickUpdate();
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("clearAirplaneData"), Value.absent());
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("clearGairmetWeather"), Value.absent());
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Reset Sim"));

    }

    /**
     * Send application config data to App
     */
    private void sendAppConfig() {
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/config"), Uri.parse("setConfig"), ConfigEnv.config);
    }

    /**
     * send new tick counts to App
     */
    private void sendTickUpdate() {
        Record tickInfo = Record.create(3)
            .slot("currentTick", this.currentVectorIndex)
            .slot("totalTicks", this.totalVectorKeys)
            .slot("simRunning", this.isSimulatorRunning)
            .slot("apiQueryEnabled", this.apiQueryEnabled.get());
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("setSimTick"), Value.fromObject(tickInfo));
    }

    /**
     * handle restarting the Sim update timer
     */
    private void startRefreshTimer() {
        this.simulationTimer = setTimer(this.simLoopInterval, this::sendNextVector);
    }   

    /**
     * Send next batch of airplane vector data to App
     */
    private void sendNextVector() {
        // be sure the sim update timer is cleared so we dont get extra calls while this method runs
        if(this.simulationTimer != null && this.simulationTimer.isScheduled()) {
            this.simulationTimer.cancel();
        }

        // handle if we are trying to send a vector index for data we dont have
        // because the sim is at the end of the map of vectors and there is nothing more to send
        if(this.currentVectorIndex >= this.totalVectorKeys) {
            // if api query not enabled, reset sim to start
            // else set current vector index back one and reset timer
            if(!this.apiQueryEnabled.get().booleanValue()) {
                this.resetSim(); // stop and reset simulator. this clears all data in sim and app
                setTimer(5000, this::startSimulator); // wait a few seconds and start the back up. We have to wait to be sure the app had time to clear data
            } else {
                // we are using live sim data but ran out of vectors, 
                // go back one vector and reset update timer 
                this.currentVectorIndex = this.currentVectorIndex-1;
                if(this.isSimulatorRunning) {
                    startRefreshTimer();
                }                
            }
            // since we know there is no vector we can send, return and wait for the next update tick
            return;
        }         

        // if there is vectors to send, try sending the next one
        if(this.currentVectorIndex < this.totalVectorKeys) {
            // make sure we have not sent this vector already
            if(this.lastVectorIndexSent != this.currentVectorIndex || this.lastVectorIndexSent == 0) {
                // make log string
                String logMsg = "send next vector: " + this.currentVectorIndex.toString();
                command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject(logMsg));
        
                // send vector to app
                command(Uri.parse("/bridge/opensky"), Uri.parse("sendVectorToApp"), Value.fromObject(this.stateVectorKeys.get(this.currentVectorIndex)));
                this.sendTickUpdate(); // update tick counts for sim and app
                this.lastVectorIndexSent = this.currentVectorIndex; //
                
                // this.currentVectorIndex = 0;
            }
            this.currentVectorIndex++;
        }

        // if Sim is running restart the update timer
        if(this.isSimulatorRunning) {
            startRefreshTimer();
        }
    }

    /**
     * Standard startup method called automatically when WebAgent is created
     */
    @Override
    public void didStart() {
        String logMsg = "SimulatorAgent: started";
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject(logMsg));
        // this.sendAppConfig();
    }
     
}
