package swim.flightinfo.agents.bridges;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.api.lane.MapLane;
import swim.concurrent.TimerRef;
import swim.structure.Value;
import swim.structure.Record;
import swim.structure.Text;
import swim.uri.Uri;
import swim.util.Cursor;
import swim.structure.Item;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Date;

public class AirplaneDataAgent extends AbstractAgent {

  private String rootApiUrl;
  private String arrivalsUrl;
  private String departuresUrl;

  private Double currentCenterLat = 41.979246;
  private Double currentCenterLong = -87.906914;

  private Double targetCenterLat = 41.979246;
  private Double targetCenterLong = -87.906914;
  private TimerRef processVectorTimer;

  // private Double targetCenterLat = 35.275750;
  // private Double targetCenterLong = -116.766667;

  private Double latOffset  = (currentCenterLat - targetCenterLat);
  private Double longOffset = (currentCenterLong - targetCenterLong);

  private static final int HISTORY_SIZE = 500;

  /**
   * Standard startup method called automatically when WebAgent is created
   */
  @Override
  public void didStart() {
    // System.out.println("AirplaneDataAgent: Agent started");
    this.startupTime.set(System.currentTimeMillis());
    Value agentConfig = getProp("config");
    this.rootApiUrl = agentConfig.get("apiUrl").stringValue();
    this.arrivalsUrl = rootApiUrl + "/flights/arrival?airport=";//EDDF&begin=1573162661&end=1573162661"; 
    this.departuresUrl = rootApiUrl + "/flights/departure?airport=";//EDDF&begin=1573162661&end=1573162661"; 

  }



  @SwimLane("startupTime")
  ValueLane<Long> startupTime = this.<Long>valueLane();

  @SwimLane("vectorBuffer")
  MapLane<Long, Value> vectorBuffer = this.<Long, Value>mapLane();

  @SwimLane("importArrivals")
  public CommandLane<Value> importArrivals = this.<Value>commandLane()
      .onCommand((Value airportInfo) -> {
        requestAirportArrivals(airportInfo.get("code").stringValue(), airportInfo.get("id").stringValue());
      });    
      
  @SwimLane("receiveVectorRecord")
  public CommandLane<Value> receiveVectorRecord = this.<Value>commandLane()
      .onCommand((Value newVectorRecord) -> {
        // System.out.println("receiveVectorRecord");
        // command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("App: received new vector data"));
        command(Uri.parse("ws://127.0.0.1:9002"), Uri.parse("/simulator"), Uri.parse("addAppLog"), Value.fromObject("received new vector data"));
        this.vectorBuffer.put(System.currentTimeMillis(), newVectorRecord);
        this.startProcessVectorTimer();
        // this.processStateVectors(newVectorRecord);
      });       

  /**
    Method which creates the data purge timer
   */
  private void startProcessVectorTimer() {
    if(this.processVectorTimer != null && this.processVectorTimer.isScheduled()) {
      this.processVectorTimer.cancel();
    }

    this.processVectorTimer = setTimer(500, this::processVectorBuffer);
  }  

  private void requestAirportArrivals(String airportCode, String airportId) {
    System.out.println("AirplaneDataAgent: requestAirportArrivals");
    command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("AirplaneDataAgent: start requestStateVectors"));

    int nowItn = (int) (new Date().getTime()/1000);
    int start = nowItn - (86400*2);
    String newUrlAlt = arrivalsUrl + airportCode + "&begin=" + Integer.toString(start) + "&end=" + Integer.toString(nowItn);

    // create record which will tell apiRequestAgent where to get data and where to put the result
    Record apiRequestInfo = Record.create()
      .slot("targetHost", "ws://127.0.0.1:9001")
      .slot("targetAgent", "/airport/" + airportId)
      .slot("targetLane", "updateArrivals")
      .slot("apiUrl", newUrlAlt);

    // send command to apiRequestAgent to fetch data
    command(Uri.parse("warp://127.0.0.1:9002"), Uri.parse("/apiRequestAgent/arrivals"), Uri.parse("makeRequest"), apiRequestInfo);

    System.out.println("AirplaneDataAgent: complete requestAirportArrivals");
  }
    
  private void processVectorBuffer() {
    Cursor<Long> recordCursor = this.vectorBuffer.keyIterator();
    while (recordCursor.hasNext()) {
      Long currRecordKey = recordCursor.next();
      this.processStateVectors(this.vectorBuffer.get(currRecordKey));
      this.vectorBuffer.remove(currRecordKey);
    }

  }

  private void processStateVectors(Value stateVectors) {
   
    final Iterator<Item> it = stateVectors.iterator();

    Integer statesImported = 0;
    Record airplaneDeltas = Record.create();
    while (it.hasNext()) {
      final Item stateVector = it.next();
      if(stateVector.getItem(1) != Text.empty()) {
        try {
          final String callsign = stateVector.getItem(1).stringValue().trim().replaceAll("\\s+","");
          Double currLat = stateVector.getItem(6).doubleValue(0d);
          Double currLong = stateVector.getItem(5).doubleValue(0d);
          Double newLat = currLat - latOffset;
          Double newLong = currLong - longOffset;

          final String msg = "{"
                              + "\"icao24\":\"" + stateVector.getItem(0).stringValue() + "\","
                              + "\"callsign\":\"" + callsign + "\","
                              + "\"originCountry\":\"" + stateVector.getItem(2).stringValue() + "\","
                              + "\"timePosition\":\"" + stateVector.getItem(3).stringValue() + "\","
                              + "\"lastContact\":\"" + stateVector.getItem(4).stringValue() + "\","
                              + "\"longitude\":\"" + newLong.toString() + "\","
                              + "\"latitude\":\"" + newLat.toString() + "\","
                              + "\"baroAltitude\":\"" + stateVector.getItem(7).stringValue() + "\","
                              + "\"onGround\":\"" + stateVector.getItem(8).stringValue() + "\","
                              + "\"velocity\":\"" + stateVector.getItem(9).stringValue() + "\","
                              + "\"heading\":\"" + stateVector.getItem(10).stringValue() + "\","
                              + "\"verticalRate\":\"" + stateVector.getItem(11).stringValue() + "\","
                              + "\"geoAltitude\":\"" + stateVector.getItem(13).stringValue() + "\","
                              + "\"squawk\":\"" + stateVector.getItem(14).stringValue() + "\","
                              + "\"spi\":\"" + stateVector.getItem(15).stringValue() + "\","
                              + "\"source\":\"" + stateVector.getItem(16).stringValue() + "\""
                              + "}";
          // System.out.println(msg);
          command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/airplanes/" + callsign), Uri.parse("updateAirplane"), Value.fromObject(msg)); 
          airplaneDeltas.add(msg);
          statesImported++;
        } catch (Exception ex) {
          System.out.println("processStateVector error:");
          System.out.println(ex);
          System.out.println(stateVector);
        }
      }
    }
    command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("addAirplaneDeltas"), airplaneDeltas); 
    // startRefreshTimer();
  }

}
