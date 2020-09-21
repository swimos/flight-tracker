package swim.flightinfo.agents;

import swim.flightinfo.eventhub.AutoScaleOnIngress;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.api.lane.MapLane;
import swim.concurrent.TimerRef;
import swim.flightinfo.configUtil.ConfigEnv;
import swim.json.Json;
import swim.structure.Value;
import swim.structure.Record;
import swim.uri.Uri;
import swim.util.Cursor;

/**
  The State Agent holds all the values for each State Vector returned by the 
  OpenSky API. One startup the webAgent will create a timer which checks the 
  last update time and closes the agent if the last update is older then 15 seconds.
 */
public class AirplaneAgent extends AbstractAgent {

  /**
    placeholder for data purge timer
   */
  private TimerRef purgeTimer;
  private TimerRef eventHubTimer;
  private Boolean isActive = false;
  private Value agentConfig;

  /**
    Value Lane which holds the callsign string of the staet vector
   */
  @SwimLane("callsign")
  protected ValueLane<String> callsign = this.<String>valueLane();

  @SwimLane("latitude")
  protected ValueLane<Value> latitude;

  @SwimLane("longitude")
  protected ValueLane<Value> longitude;

  /**
    Value Lane which holds the last update timestamp
   */
  @SwimLane("lastUpdate")
  protected ValueLane<Long> lastUpdate = this.<Long>valueLane();

  /**
    Value lane which holds a Record of the full state data for the current State Vector
   */
  @SwimLane("fullState")
  protected ValueLane<Value> fullState = this.<Value>valueLane();

  /**
    Value lane which holds a Record of the full state data for the current State Vector
   */
  @SwimLane("onGround")
  protected ValueLane<Value> onGround = this.<Value>valueLane();

  @SwimLane("tracks")
  protected MapLane<Long, Record> tracks;

  @SwimLane("bearingHistory")
  protected MapLane<Long, Value> bearingHistory;

  @SwimLane("bearingTotal")
  protected ValueLane<Float> bearingTotal = this.<Float>valueLane();

  /**
    Command Lane used to update the state data for current Airplane State Vector
   */
  @SwimLane("updateAirplane")
  public CommandLane<Value> updateStateFromValue = this.<Value>commandLane()
      .onCommand((Value newValue) -> {
        // System.out.println("stateAgent: update state from value");
        // System.out.println(newValue);
        long timestamp = System.currentTimeMillis();
        Value stateData = Json.parse(newValue.stringValue());  // convert incoming value into JSON

        Float newLat = stateData.get("latitude").floatValue(0f);
        Float currLat = this.latitude.get().floatValue(0f);
        Float newLong = stateData.get("longitude").floatValue(0f);
        Float currLong = this.longitude.get().floatValue(0f);

        if(Float.compare(newLat, currLat) != 0 || Float.compare(newLong, currLong) != 0) {

          this.fullState.set(stateData); // store new state data on fullState Value Lane
          this.callsign.set(stateData.get("callsign").stringValue("DEADBEEF")); // store call sign on Value Lane
          this.latitude.set(stateData.get("latitude"));
          this.longitude.set(stateData.get("longitude"));
          this.bearingHistory.put(timestamp, stateData.get("heading"));

          Record currentTrackPoint = Record.create(2)
              .slot("lat", this.latitude.get().floatValue(0f))
              .slot("lng", this.longitude.get().floatValue(0f));

          this.totalBearingHistory();
          this.tracks.put(timestamp, currentTrackPoint);
          this.isActive = true;

          Record tempRecord = Record.create()
            .slot("callsign", this.callsign.get())
            .slot("longitude", this.longitude.get())
            .slot("latitude", this.latitude.get())
            .slot("onGround", stateData.get("onGround"))
            .slot("bearingTotal", this.bearingTotal.get())
            .slot("icao24", stateData.get("icao24").stringValue())
            .slot("geoAltitude", stateData.get("geoAltitude"))
            .slot("baroAltitude", stateData.get("baroAltitude"))
            .slot("velocity", stateData.get("velocity"))
            .slot("heading", stateData.get("heading"))
            .slot("originCountry", stateData.get("originCountry"))
            .slot("verticalRate", stateData.get("verticalRate"));
          
          // update Aggregation WebAgent with current data
          command(Uri.parse(this.agentConfig.get("serverUrl").stringValue()), Uri.parse("aggregation"), Uri.parse("addAirplane"), tempRecord); 

        }
        
        this.lastUpdate.set(timestamp); // update lastUpdate Value Lane
        this.setPurgeTimer(); // make call to create data purge timer
      });  

  @SwimLane("removeAirplane")
  public CommandLane<Value> removeAirplane = this.<Value>commandLane()
    .onCommand((Value value) -> {
      try {
        this.stopAgent();
      } catch(Exception ex) {
        System.out.println("error removing airplane");
      }
      
    });

  /**
    Standard startup method called automatically when WebAgent is created
   */
  @Override
  public void didStart() {
    // System.out.println("Agent did start: " + this.callsign.get());
    // this.setPurgeTimer(); // make call to create data purge timer
    if(ConfigEnv.AIRPLANE_HUB_NAME != null) {
      this.setEventHubTimer();
    }    
    this.agentConfig = getProp("config"); // grab config value for this agent from server.recon
  }

  /**
    Method which creates the data purge timer
   */
  private void setPurgeTimer() {
    if(this.purgeTimer != null && this.purgeTimer.isScheduled()) {
      this.purgeTimer.cancel();
    }
    this.purgeTimer = setTimer(1000, this::checkDataTimeout);
  }  

  /**
    Method to check lastUpdate timestamp and purge if data is stale
   */
  private void checkDataTimeout() {
    long timestamp = System.currentTimeMillis();
    Long timeDiff = timestamp - this.lastUpdate.get();   

    if(timeDiff > 60000) {
      // System.out.println("Agent Expired: " + this.callsign.get());
      this.stopAgent();
      return;
    } 

    this.setPurgeTimer();
    
  }

  private void stopAgent() {
    // System.out.println("Stop Agent: " + this.callsign.get());
    this.isActive = false;
    if(this.purgeTimer != null && this.purgeTimer.isScheduled()) {
      this.purgeTimer.cancel();
    }
    
    if(this.eventHubTimer != null && this.eventHubTimer.isScheduled()) {
      eventHubTimer.cancel();
    }
    this.clearTracks();
    command(Uri.parse(this.agentConfig.get("serverUrl").stringValue()), Uri.parse("aggregation"), Uri.parse("removeAirplane"), Value.fromObject(this.callsign.get())); 
    
    close();

  }

  private void clearTracks() {
    this.latitude.set(Value.absent());
    this.longitude.set(Value.absent());
    this.fullState.set(Value.absent());
    this.onGround.set(Value.absent());
    this.bearingTotal.set(0f);
    Cursor<Long> trackRecordCursor = this.tracks.keyIterator();
    while (trackRecordCursor.hasNext()) {
      Long currKey = trackRecordCursor.next();
      this.tracks.remove(currKey);
    }        
    Cursor<Long> bearingRecordCursor = this.bearingHistory.keyIterator();
    while (bearingRecordCursor.hasNext()) {
      Long currKey = bearingRecordCursor.next();
      this.bearingHistory.remove(currKey);
    }        

  }

  private void totalBearingHistory() {
    Cursor<Long> recordCursor = this.bearingHistory.keyIterator();
    Float previousBearing = -1f;
    Float deltaTotal = 0f;
    while (recordCursor.hasNext()) {
      Long currKey = recordCursor.next();
      Float currentBearing = this.bearingHistory.get(currKey).floatValue();
      if(previousBearing == -1f) {
        previousBearing = currentBearing;
      } else {
        int floatCompare = Float.compare(currentBearing, previousBearing);
        float newDelta = 0f;
        if(floatCompare > 0) {
          newDelta = currentBearing - previousBearing;
          if(newDelta < 180f && newDelta > -180f) {
            deltaTotal = deltaTotal + newDelta;
          }
        } else if(floatCompare < 0){
          newDelta = previousBearing - currentBearing;
          if(newDelta < 180f && newDelta > -180f) {
            deltaTotal = deltaTotal - newDelta;
          }

        }
        previousBearing = currentBearing;
      }
      
    }       
    
    this.bearingTotal.set(deltaTotal);

  }

  private void setEventHubTimer() {
    if(this.eventHubTimer != null && this.eventHubTimer.isScheduled()) {
      this.eventHubTimer.cancel();
    }
    this.eventHubTimer = setTimer(60 * 1000 * 5, this::sendToEventHub);
  }
  
  private void sendToEventHub() {
    String msgStr = dataGenerator();
    // System.out.println(msgStr);
    try {
      AutoScaleOnIngress.autoScaleToEventHub(msgStr, ConfigEnv.NAMESPACE_NAME, ConfigEnv.AIRPLANE_HUB_NAME, ConfigEnv.SASKEY_NAME, ConfigEnv.SAS_KEY);
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    this.setEventHubTimer();
  }   

  private String dataGenerator() {
    if(!this.isActive) {
      this.eventHubTimer.cancel();
      this.purgeTimer.cancel();
    }
    final StringBuilder sb = new StringBuilder();
    final long tm = System.currentTimeMillis();
    final Value planeCurrState = this.fullState.get();
    
      sb.append("{\"callsign\":");
      sb.append("\"" + this.callsign.get() + "\"");
      sb.append(",\"icao24\":");
      sb.append("\"" + planeCurrState.get("icao24").stringValue("") + "\"");
      sb.append(",\"originCountry\":");
      sb.append("\"" + planeCurrState.get("originCountry").stringValue("") + "\"");
      sb.append(",\"lastContactTimestamp\":");
      sb.append("\"" + planeCurrState.get("lastContact").stringValue("") + "\"");

      sb.append(",\"latitude\":");
      if(planeCurrState.get("latitude").stringValue() == "") {
        sb.append(0);
      } else {
        sb.append(planeCurrState.get("latitude").stringValue("0"));
      }
      
      sb.append(",\"longitude\":");
      if(planeCurrState.get("longitude").stringValue() == "") {
        sb.append(0);
      } else {
        sb.append(planeCurrState.get("longitude").stringValue("0"));
      }
      
      sb.append(",\"baroAltitude\":");
      if(planeCurrState.get("baroAltitude").stringValue() == "") {
        sb.append(0);
      } else {
        sb.append(planeCurrState.get("baroAltitude").stringValue("0"));
      }
      
      sb.append(",\"geoAltitude\":");
      if(planeCurrState.get("geoAltitude").stringValue() == "") {
        sb.append(0);
      } else {
        sb.append(planeCurrState.get("geoAltitude").stringValue("0"));
      }

      sb.append(",\"onGround\":");
      sb.append(planeCurrState.get("onGround").stringValue("false"));

      sb.append(",\"velocity\":");
      if(planeCurrState.get("velocity").stringValue() == "") {
        sb.append(0);
      } else {
        sb.append(planeCurrState.get("velocity").stringValue("0"));
      }

      
      sb.append(",\"heading\":");
      sb.append(planeCurrState.get("heading").stringValue("0"));

      sb.append(",\"verticalRate\":");

      if(planeCurrState.get("verticalRate").stringValue() == "") {
        sb.append(0);
      } else {
        sb.append(planeCurrState.get("verticalRate").stringValue());
      }
      
      sb.append(",\"squawk\":");
      sb.append(planeCurrState.get("squawk").stringValue(""));
      sb.append(",\"spi\":");
      sb.append(planeCurrState.get("spi").stringValue(""));
      sb.append(",\"source\":");
      sb.append("\"" + planeCurrState.get("source").stringValue("") + "\"");


      sb.append("}");
      sb.append(System.lineSeparator());
      
    return sb.toString();    
  }  
}
