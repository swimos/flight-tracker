package swim.simulator.agents.bridges;

import swim.api.SwimLane;
import swim.api.lane.CommandLane;
import swim.simulator.agents.DataImportAgent;
import swim.structure.Value;
import swim.structure.Record;
import swim.uri.Uri;
import swim.simulator.configUtil.ConfigEnv;

/**
 * The State Agent holds all the values for each State Vector returned by the
 * OpenSky API. One startup the webAgent will create a timer which checks the
 * last update time and closes the agent if the last update is older then 15
 * seconds.
 */
public class AirportsImportAgent extends DataImportAgent {


    private Value appConfig = ConfigEnv.config;
    private Value agentConfig;

    /**
    * Standard startup method called automatically when WebAgent is created
    */
    @Override
    public void didStart() {
        super.didStart();
        final Value agentConfig = getProp("config");
        this.initialize(agentConfig, appConfig, "airports");
        String logMsg = "Airport Import Agent: Agent started";
        command(Uri.parse("warp://127.0.0.1:9002"), Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject(logMsg));
    }  

    @SwimLane("syncApp")
    public CommandLane<Value> syncAppCommand = this.<Value>commandLane()
        .onCommand((Value newVectorRecord) -> {
            this.processCsvData();
        });      

    /**
     * read and parse csv file
     */
    @Override
    public void readCsvFile() {
        super.readCsvFile(); // let base class do the actual file read
        this.processCsvData(); // process the results and make it useful data
    }

    /**
     * parse each record in the csvData map lane
     */
    public void processCsvData() {
        Integer largeCount = 0;
        Integer mediumCount = 0;

        // read and process each row of data
        for(Integer i=0; i < this.csvData.size(); i++) {
            Record rowItem = this.csvData.get(i);
            String airportId = rowItem.get("id").stringValue();
            String airportType = rowItem.get("type").stringValue().replace("\"", "");

            // send processed data to App
            if(airportType.compareTo("large_airport") == 0) {
                command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/airport/" + airportId), Uri.parse("addLargeAirport"), rowItem);
                largeCount++;
            }
            if(airportType.compareTo("medium_airport") == 0) {
                command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/airport/" + airportId), Uri.parse("addMediumAirport"), rowItem);                             
                mediumCount++;
            }        
        }
        // notify Aggregation agent in App to update any airport filters 
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("runAirportFilter"), Value.absent()); 

        // log results
        String logMsg = "Found " + largeCount.toString() + " large and " + mediumCount.toString() + " medium airports";
        command(Uri.parse("warp://127.0.0.1:9002"), Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject(logMsg));

    }
}