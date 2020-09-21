package swim.flightinfo.agents;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.structure.Value;
import swim.uri.Uri;

public class AirportAgent extends AbstractAgent {

  private Value agentConfig;

  @SwimLane("id")
  protected ValueLane<Value> airportId;

  @SwimLane("name")
  protected ValueLane<Value> name;

  @SwimLane("arrivals")
  protected ValueLane<Value> arrivals;

  @SwimLane("code")
  protected ValueLane<Value> airportCode;

  @SwimLane("latitude")
  protected ValueLane<Value> latitude;

  @SwimLane("longitude")
  protected ValueLane<Value> longitude;

  @SwimLane("fullRowData")
  protected ValueLane<Value> fullRowData;

  @SwimLane("updateArrivals")
  public CommandLane<Value> updateArrivalsCommand = this.<Value>commandLane()
    .onCommand((Value arrivalData) -> {
      // System.out.println(arrivalData);
      this.arrivals.set(arrivalData);
    });

  @SwimLane("addLargeAirport")
  public CommandLane<Value> addLargeAirport = this.<Value>commandLane()
      .onCommand((Value newValue) -> {
        this.addAirport(newValue, "large");
      });      

  @SwimLane("addMediumAirport")
  public CommandLane<Value> addMediumAirport = this.<Value>commandLane()
      .onCommand((Value newValue) -> {
        this.addAirport(newValue, "medium");
      });      
    
  private void addAirport(Value newValue, String type) {
    long timestamp = System.currentTimeMillis();
    Value stateData = newValue;//Json.parse(newValue.stringValue());  // convert incoming value into JSON

    this.fullRowData.set(stateData); // store new state data on fullState Value Lane
    this.airportId.set(stateData.get("id"));
    this.airportCode.set(stateData.get("shortCode"));
    this.name.set(stateData.get("name"));
    this.latitude.set(stateData.get("latitude"));
    this.longitude.set(stateData.get("latitude"));

    // update Aggregation WebAgent with current data
    if(type == "large") {
      command(Uri.parse(this.agentConfig.get("serverUrl").stringValue()), Uri.parse("aggregation"), Uri.parse("addLargeAirport"), stateData); 
    } else if(type == "medium") {
      command(Uri.parse(this.agentConfig.get("serverUrl").stringValue()), Uri.parse("aggregation"), Uri.parse("addMediumAirport"), stateData); 
    }
  }
  /**
    Standard startup method called automatically when WebAgent is created
   */
  @Override
  public void didStart() {
    this.agentConfig = getProp("config"); // grab config value for this agent from server.recon
  }

}
