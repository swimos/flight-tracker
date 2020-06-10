package swim.flightinfo.agents.ui;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.api.lane.MapLane;
import swim.structure.Value;
import swim.structure.Record;
import swim.uri.Uri;

public class UserPrefsAgent extends AbstractAgent {

  private boolean showLargeAirports = true;
  private boolean showMediumAirports = false;
  private boolean showIceWeather = true;
  private boolean showTurbHi = true;
  private boolean showTurbLo = true;
  private boolean showIFR = true;
  private boolean showFzLvl = true;
  private boolean showMtObsc = true;
  private boolean showSfsWind = true;
  private String airplaneColorType = "altitude";

  private String userGuid = null;

  @SwimLane("mapSettings")
  ValueLane<Record> mapSettings;

  @SwimLane("filteredAirportList")
  MapLane<Value, Value> filteredAirportList = this.<Value, Value>mapLane();

  @SwimLane("uiFilters")
  MapLane<String, Boolean> uiFilters = this.<String, Boolean>mapLane();

  @SwimLane("setGuid")
  public CommandLane<String> setGuidCommand = this.<String>commandLane()
    .onCommand((String newGuid) -> {
      this.userGuid = newGuid;
      this.triggerAirportFilters();
      // System.out.println("user guid set");
      // System.out.println(this.userGuid);
    });

  @SwimLane("updateMapSettings")
  public CommandLane<Value> updateMapSettings = this.<Value>commandLane()
    .onCommand((Value mapInfo) -> {
      // System.out.println("update map settings");
      // System.out.println(mapInfo);
      this.mapSettings.set(Record.of(mapInfo));

    });
  
  @SwimLane("addFilteredAirport")
  public CommandLane<Value> addFilterdAirport = this.<Value>commandLane()
    .onCommand((Value airportData) -> {
      // System.out.println(airportData);
      this.filteredAirportList.put(airportData.get("id"), airportData);

    });

  @SwimLane("removeFilteredAirport")
  public CommandLane<Value> removeFilterdAirport = this.<Value>commandLane()
    .onCommand((Value airportData) -> {
      this.filteredAirportList.remove(airportData.get("id"));
    });


  @SwimLane("toggleMediumAirports")
  public CommandLane<Value> toggleMediumAirports = this.<Value>commandLane()
    .onCommand((Value showAirports) -> {
      this.showMediumAirports = showAirports.booleanValue();
      this.uiFilters.put("2mediumAirports", this.showMediumAirports);
      // System.out.println("toggle medium airports:" + showAirports.stringValue());
      this.triggerAirportFilters();
    });

  @SwimLane("toggleLargeAirports")
  public CommandLane<Value> toggleLargeAirports = this.<Value>commandLane()
    .onCommand((Value showAirports) -> {
      this.showLargeAirports = showAirports.booleanValue();
      this.uiFilters.put("1largeAirports", this.showLargeAirports);
      // System.out.println("toggle large airports:" + showAirports.stringValue());
      this.triggerAirportFilters();
    });

  @SwimLane("toggleWeather")
  public CommandLane<Value> toggleWeatherCommand = this.<Value>commandLane()
    .onCommand((Value filterInfo) -> {
      // System.out.println(filterInfo);
      this.uiFilters.put(filterInfo.get("name").stringValue(), filterInfo.get("value").booleanValue());
    });

  private void triggerAirportFilters() {
      Record filterInfo = Record.create()
        .slot("userGuid", this.userGuid)
        .slot("showLargeAirports", this.showLargeAirports)
        .slot("showMediumAirports", this.showMediumAirports);

      // System.out.println(filterInfo);
      command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("runAirportFilter"), Value.fromObject(filterInfo));
  }
  @Override
  public void didStart() {
      // command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("aggregation"), Uri.parse("addDevice"), Value.fromObject(this.callsign.get())); 
      this.uiFilters.put("1largeAirports", this.showLargeAirports);
      this.uiFilters.put("2mediumAirports", this.showMediumAirports);
      this.uiFilters.put("3iceWeather", this.showIceWeather);
      this.uiFilters.put("4turbHi", this.showTurbHi);
      this.uiFilters.put("5turbLo", this.showTurbLo);
      this.uiFilters.put("6IFR", this.showIFR);
      this.uiFilters.put("7fzlvl", this.showFzLvl);
      this.uiFilters.put("8mtObsc", this.showMtObsc);
      this.uiFilters.put("9sfcWind", this.showSfsWind);
      this.uiFilters.put("9sfcWind", this.showSfsWind);
      
  }       
     
}