package swim.flightinfo.agents;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.MapLane;
import swim.api.lane.ValueLane;
import swim.concurrent.TimerRef;
import swim.flightinfo.eventhub.AutoScaleOnIngress;
import swim.structure.Record;
import swim.structure.Value;
import swim.uri.Uri;
import swim.json.Json;
import swim.util.Cursor;
import swim.flightinfo.configUtil.ConfigEnv;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * The Aggregation WebAgent is responsible for tracking and storing data which
 * is aggregated from all the State Vector WebAgents which are created
 */
public class AggregationAgent extends AbstractAgent {

  // placeholder for timer which posts to Azure EventHub
  private TimerRef eventHubTimer;
  // private boolean showLargeAirports = true;
  // private boolean showMediumAirports = false;
  private String targetDirectory = "../rawData/out";
  private TimerRef recountTimer;
  private Integer maxMedAirports = 3000;
  private Integer airportCount = 0;

  /**
   * Map Lane which holds a list of all the State Vectors that are currently
   * active
   */
  @SwimLane("airplaneList")
  MapLane<Value, Value> airplaneList = this.<Value, Value>mapLane()
      // update the state count value lane when new state vectors are added or removed
      // from this list
      .didUpdate((k, n, o) -> {
        this.airplaneCount.set(this.airplaneList.size());
        this.setRecountTimer();
      }).didRemove((k, o) -> {
        this.airplaneCount.set(this.airplaneList.size());
        this.setRecountTimer();
      });


  @SwimLane("airplaneDeltas")
  ValueLane<Record> airplaneDeltas = this.<Record>valueLane();      

  @SwimLane("addAirplaneDeltas")
  public CommandLane<Record> addAirplaneDeltasCommand = this.<Record>commandLane()
    .onCommand((Record newDeltas) -> {
      this.airplaneDeltas.set(newDeltas);
    });

  /**
   * MapLane of all active callsigns
   */
  @SwimLane("callsigns")
  MapLane<Value, Value> callsigns = this.<Value, Value>mapLane()
      // update the count of callsign as they are added and removed
      .didUpdate((k, n, o) -> {
        this.callsignCount.set(this.callsigns.size());
      }).didRemove((k, o) -> {
        this.callsignCount.set(this.callsigns.size());
      });

  @SwimLane("largeAirportList")
  MapLane<Value, Value> largeAirportList = this.<Value, Value>mapLane()
      // update the state count value lane when new state vectors are added or removed
      // from this list
      .didUpdate((k, n, o) -> {
        this.largeAirportCount.set(this.largeAirportList.size());
        this.totalAirportCount.set(this.largeAirportList.size() + this.mediumAirportCount.get());
      }).didRemove((k, o) -> {
        this.largeAirportCount.set(this.largeAirportList.size());
        this.totalAirportCount.set(this.largeAirportList.size() + this.mediumAirportCount.get());
      });

  @SwimLane("mediumAirportList")
  MapLane<Value, Value> mediumAirportList = this.<Value, Value>mapLane()
      // update the state count value lane when new state vectors are added or removed
      // from this list
      .didUpdate((k, n, o) -> {
        this.mediumAirportCount.set(this.mediumAirportList.size());
        this.totalAirportCount.set(this.mediumAirportList.size() + this.largeAirportCount.get());
      }).didRemove((k, o) -> {
        this.mediumAirportCount.set(this.mediumAirportList.size());
        this.totalAirportCount.set(this.mediumAirportList.size() + this.largeAirportCount.get());
      });

  @SwimLane("altitudeAggregation")
  MapLane<Integer, Integer> altitudeAggregation = this.<Integer, Integer>mapLane();
      
  @SwimLane("gairmetList")
  MapLane<Integer, Value> gairmetList = this.<Integer, Value>mapLane();

  @SwimLane("countriesList")
  MapLane<String, Record> countriesList = this.<String, Record>mapLane();

  @SwimLane("airplaneCount")
  ValueLane<Integer> airplaneCount = this.<Integer>valueLane();

  @SwimLane("callsignCount")
  ValueLane<Integer> callsignCount = this.<Integer>valueLane();

  @SwimLane("largeAirportCount")
  ValueLane<Integer> largeAirportCount = this.<Integer>valueLane();

  @SwimLane("mediumAirportCount")
  ValueLane<Integer> mediumAirportCount = this.<Integer>valueLane();

  @SwimLane("totalAirportCount")
  ValueLane<Integer> totalAirportCount = this.<Integer>valueLane();

  @SwimLane("currentSimTime")
  ValueLane<Long> currentSimTime = this.<Long>valueLane();

  @SwimLane("currentSimTicks")
  ValueLane<Value> currentSimTicks = this.<Value>valueLane();

  @SwimLane("onGroundCount")
  ValueLane<Integer> onGroundCount = this.<Integer>valueLane();

  @SwimLane("inAirCount")
  ValueLane<Integer> inAirCount = this.<Integer>valueLane();
  
  @SwimLane("originCount")
  MapLane<String, Record> originCount = this.<String, Record>mapLane();

  @SwimLane("onGround")
  MapLane<Value, Value> onGround = this.<Value, Value>mapLane()
    .didUpdate((k, n, o) -> {
      if(this.onGroundCount.get() != this.onGround.size()) {
        this.onGroundCount.set(this.onGround.size());
      }
    }).didRemove((k, o) -> {
      if(this.onGroundCount.get() != this.onGround.size()) {
        this.onGroundCount.set(this.onGround.size());
      }
    });

  @SwimLane("inAir")
  MapLane<Value, Value> inAir = this.<Value, Value>mapLane()
    .didUpdate((k, n, o) -> {
      if(this.inAirCount.get() != this.inAir.size()) {
        this.inAirCount.set(this.inAir.size());
      }
      
    }).didRemove((k, o) -> {
      if(this.inAirCount.get() != this.inAir.size()) {
        this.inAirCount.set(this.inAir.size());
      }
    });

  /**
   * Command Lane called by State Agents when they are created or updated. This will insert
   * the new State Vector into stateList and callsign Map Lanes
   */
  @SwimLane("addAirplane")
  public CommandLane<Value> addAirplaneCommand = this.<Value>commandLane()
    .onCommand((Value newState) -> {
      Value currCallsign = Value.fromObject(newState.get("callsign"));
      Value currAirplane = this.airplaneList.get(currCallsign);

      // if new airplane is not in airplane list (new airplane), update the origin count
      if(currAirplane == Value.absent()) {
        String planeOrigin = newState.get("originCountry").stringValue();
        Value originRecord = this.originCount.get(planeOrigin);
        if(originRecord == Value.absent()) {
          Record newCountRecord = Record.create()
            .slot("name", planeOrigin)
            .slot("count", 1);

          this.originCount.put(planeOrigin, newCountRecord);
        } else {
          Integer currOriginCount = originRecord.get("count").intValue(0);
          currOriginCount = currOriginCount + 1;
          // Value newCount = Value.fromObject(currOriginCount);

          Record newCountRecord = Record.create()
            .slot("name", originRecord.get("name").stringValue())
            .slot("count", currOriginCount);

          // 
          this.originCount.put(planeOrigin, newCountRecord);
  
        }
      }

      // update airplane and callsign lists
      this.airplaneList.put(currCallsign, newState);
      this.callsigns.put(currCallsign, currCallsign);
    });

  /**
   * Command Lane called by State Agents when they purge themselves This will
   * remove the State Vector from stateList and callsign Lanes
   */
  @SwimLane("removeAirplane")
  public CommandLane<Value> removeAirplaneCommand = this.<Value>commandLane()
    .onCommand((Value removedState) -> {
      Value currAirplane = this.airplaneList.get(removedState);
      if(currAirplane != Value.absent()) {
        // String planeOrigin = currAirplane.get("originCountry").stringValue();
        // Integer currOriginCount = this.originCount.get(planeOrigin).intValue(0);
        // if(currOriginCount > 0) {
        //   currOriginCount = currOriginCount - 1;
        //   Value newCount = Value.fromObject(currOriginCount);
        //   this.originCount.put(planeOrigin, newCount);
        // }

        String planeOrigin = currAirplane.get("originCountry").stringValue();
        Value originRecord = this.originCount.get(planeOrigin);        
        Integer currOriginCount = originRecord.get("count").intValue(0);
        currOriginCount = currOriginCount - 1;
        // Value newCount = Value.fromObject(currOriginCount);

        if(currOriginCount >= 0) {
          Record newCountRecord = Record.create()
            .slot("name", originRecord.get("name").stringValue())
            .slot("count", currOriginCount);

          // 
          this.originCount.put(planeOrigin, newCountRecord);
        }
      }
      this.airplaneList.remove(removedState);
      this.callsigns.remove(removedState);

      // this.onGround.remove(removedState);
      // this.inAir.remove(removedState);
    });

  @SwimLane("clearAirplaneData")
  public CommandLane<Value> clearAirplaneData = this.<Value>commandLane()
    .onCommand((Value removedState) -> {
      this.airplaneList.forEach((airplaneKey, airplaneValue) -> {
        String callsign = airplaneKey.stringValue("none");
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/airplanes/" + callsign), Uri.parse("removeAirplane"),
            Value.absent());

      });
      this.airplaneDeltas.set(Record.create());
    });

  /**
   * Command Lane called by Airport Agents when they are created.
   */
  @SwimLane("addLargeAirport")
  public CommandLane<Value> addLargeAirport = this.<Value>commandLane()
    .onCommand((Value newState) -> {
      // System.out.println(newState.get("id"));
      Value currAirportId = newState.get("id");
      this.largeAirportList.put(currAirportId, newState);
      // this.filterAirportList();
    });

  /**
   * Command Lane called by Airport Agents when they are created.
   */
  @SwimLane("addMediumAirport")
  public CommandLane<Value> addMediumAirport = this.<Value>commandLane()
    .onCommand((Value newState) -> {
      // if (this.mediumAirportList.size() <= 2000) {
        Value currAirportId = newState.get("id");
        this.mediumAirportList.put(currAirportId, newState);
        // this.filterAirportList();
      // }
    });

  @SwimLane("addCountry")
  public CommandLane<Record> addCountryCommand = this.<Record>commandLane()
    .onCommand((Record newCountry) -> {
      String countryName = newCountry.get("name").stringValue();
      this.countriesList.put(countryName, newCountry);
    });    

  // @SwimLane("toggleMediumAirports")
  // public CommandLane<Value> toggleMediumAirports = this.<Value>commandLane()
  //   .onCommand((Value showAirports) -> {
  //     this.showMediumAirports = showAirports.booleanValue();
  //     this.uiFilters.put("2mediumAirports", this.showMediumAirports);
  //     // System.out.println("toggle medium airports:" + showAirports.stringValue());
  //     this.filterAirportList();
  //   });

  // @SwimLane("toggleLargeAirports")
  // public CommandLane<Value> toggleLargeAirports = this.<Value>commandLane()
  //   .onCommand((Value showAirports) -> {
  //     this.showLargeAirports = showAirports.booleanValue();
  //     this.uiFilters.put("1largeAirports", this.showLargeAirports);
  //     // System.out.println("toggle large airports:" + showAirports.stringValue());
  //     this.filterAirportList();
  //   });

  @SwimLane("runAirportFilter")
  public CommandLane<Value> runAirportFilter = this.<Value>commandLane()
    .onCommand((Value filterInfo) -> {
      // System.out.println("run airport filter");
      this.filterAirportList(filterInfo);
    });

  @SwimLane("refreshAltitudeCount")
  public CommandLane<Value> refreshAltitudeCountCommand = this.<Value>commandLane()
    .onCommand((Value v) -> {
      this.refreshAltitudeCounts();
    });

  @SwimLane("setSimTime")
    public CommandLane<Value> setSimTimeCommand = this.<Value>commandLane()
      .onCommand((Value v) -> {
        this.currentSimTime.set(v.longValue());
      });    
  
  @SwimLane("setSimTick")
    public CommandLane<Value> setSimTickCommand = this.<Value>commandLane()
      .onCommand((Value v) -> {
        // System.out.println(v);
        this.currentSimTicks.set(v);
      });    
  
  @SwimLane("addGairmetWeather")
    public CommandLane<Value> addGairmetWeather = this.<Value>commandLane()
      .onCommand((Value gairmet) -> {
        this.gairmetList.put(this.gairmetList.size(), Json.parse(gairmet.stringValue()));
        // System.out.println("add gairmet");
      });                     

  @SwimLane("clearGairmetWeather")
    public CommandLane<Value> clearGairmetWeather = this.<Value>commandLane()
      .onCommand((Value gairmet) -> {
        // this.gairmetList.put(this.gairmetList.size(), Json.parse(gairmet.stringValue()));
        // System.out.println("Clear weather");
        Cursor<Integer> recordCursor = this.gairmetList.keyIterator();
        while (recordCursor.hasNext()) {
          Integer currKey = recordCursor.next();
          this.gairmetList.remove(currKey);
        }
      });         
  /**
   * Standard startup method called automatically when WebAgent is created
   */
  @Override
  public void didStart() {
    if(ConfigEnv.AGGREGATE_HUB_NAME != null) {
      this.setEventHubTimer();
    }
    
    System.out.println("Aggregation Agent started");
  }

  private void filterAirportList(Value filterInfo) {
    String userGuid = filterInfo.get("userGuid").stringValue("");
    Boolean showLargeAirports = filterInfo.get("showLargeAirports").booleanValue(false);
    Boolean showMediumAirports = filterInfo.get("showMediumAirports").booleanValue(false);
    airportCount = 0;

    this.largeAirportList.forEach((Value listKey, Value listValue) -> {
      if (showLargeAirports) {
        //this.filteredAirportList.put(listValue.get("id"), listValue);
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/userPrefs/" + userGuid), Uri.parse("addFilteredAirport"), listValue);
      } else {
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/userPrefs/" + userGuid), Uri.parse("removeFilteredAirport"), listValue);
        // this.filteredAirportList.remove(listValue.get("id"));
      }
    });

    this.mediumAirportList.forEach((Value listKey, Value listValue) -> {
      if (showMediumAirports) {
        if(airportCount <= maxMedAirports) {
          command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/userPrefs/" + userGuid), Uri.parse("addFilteredAirport"), listValue);
          // this.filteredAirportList.put(listValue.get("id"), listValue);
          airportCount++;
        }
      } else {
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/userPrefs/" + userGuid), Uri.parse("removeFilteredAirport"), listValue);
        // this.filteredAirportList.remove(listValue.get("id"));
      }
    });
  }

  // calls for saving CSV files

  public void saveFile(String absolutePath, String fileContent) {
    // System.out.println("Save:" + absolutePath);
    try (FileOutputStream fileOutputStream = new FileOutputStream(absolutePath)) {
      fileOutputStream.write(fileContent.getBytes());
    } catch (FileNotFoundException e) {
      System.out.println("file not saved:" + absolutePath);
      System.out.println(e);
    } catch (IOException e) {
      System.out.println("file write error");
      // exception handling
    }
  }

  public void saveWeatherToCsv() {
    String absolutePath = targetDirectory + File.separator + "weather.csv";
    Cursor<Integer> recordCursor = this.gairmetList.keyIterator();
    // MapList<String, String> fileContent = new MapList();
    String fileContent  = "product,tag,hazardType,hazardSeverity,wxDetails,receiptTime,issueTime,expireTime,validTime,altitudeMin,altitudeMax,geometry_type\n";
    while (recordCursor.hasNext()) {
      Integer currKey = recordCursor.next();
      Value currRecord = this.gairmetList.get(currKey);
      // fileContent += Json.toString(currRecord);
      fileContent += currRecord.get("product").stringValue("") + "," 
          + currRecord.get("tag").stringValue("") + "," 
          + currRecord.get("hazard_type").stringValue("") + ","
          + currRecord.get("hazard_severity").stringValue("") + "," 
          + currRecord.get("wx_details").stringValue("") + ","
          + currRecord.get("receipt_time").stringValue("") + ","      
          + currRecord.get("issue_time").stringValue("") + ","      
          + currRecord.get("expire_time").stringValue("") + ","      
          + currRecord.get("valid_time").stringValue("") + ","      
          + currRecord.get("altitude_minimum").stringValue("") + ","
          + currRecord.get("altitude_maximum").stringValue("") + ","      
          + currRecord.get("geometry_type").stringValue("") + "\n";      
          // + currRecord.get("points").stringValue("") + ","            
    }

    this.saveFile(absolutePath, fileContent);
  }  


  private void setRecountTimer() {
    if(this.recountTimer != null) {
      if(this.recountTimer.isScheduled()) {
        this.recountTimer.reschedule(100);
      } else {
        this.recountTimer = setTimer(100, this::refreshAltitudeCounts);
      }
    } else {
      this.recountTimer = setTimer(100, this::refreshAltitudeCounts);
    }
    
  } 

  private void refreshAltitudeCounts() {
    Iterator<Value> planeKeys = (Iterator)this.airplaneList.keyIterator();
    int[] altitudeCounts = new int[10];
    int groundCount = 0;
    int airCount = 0;

    while(planeKeys.hasNext()) {
      Value currentKey = planeKeys.next();
      Float currentAltitude = this.airplaneList.get(currentKey).get("baroAltitude").floatValue(0f);
      Boolean isOnGround = this.airplaneList.get(currentKey).get("onGround").booleanValue();

      if(currentAltitude <= 0f) {
        altitudeCounts[0]++;
      } else if (currentAltitude >= 1f && currentAltitude < 2000f) {
        altitudeCounts[1]++;
      } else if (currentAltitude >= 2000f && currentAltitude < 4000f) {
        altitudeCounts[2]++;
      } else if (currentAltitude >= 4000f && currentAltitude < 8000f) {
        altitudeCounts[3]++;
      } else if (currentAltitude >= 8000f && currentAltitude < 10000f) {
        altitudeCounts[4]++;
      } else if (currentAltitude >= 10000f) {
        altitudeCounts[5]++;
      }

      if(isOnGround) {
        groundCount++;
      } else if(!isOnGround) {
        airCount++;
      }      
    }

    this.altitudeAggregation.put(1, altitudeCounts[0]);
    this.altitudeAggregation.put(2, altitudeCounts[1]);
    this.altitudeAggregation.put(3, altitudeCounts[2]);
    this.altitudeAggregation.put(4, altitudeCounts[3]);
    this.altitudeAggregation.put(5, altitudeCounts[4]);
    this.altitudeAggregation.put(6, altitudeCounts[5]);
    
    if(this.onGroundCount.get() != groundCount) {
      this.onGroundCount.set(groundCount);
    }
    if(this.inAirCount.get() != airCount) {
      this.inAirCount.set(airCount);
    }    
  }  

  private void setEventHubTimer() {
    eventHubTimer = setTimer( 60 * 1000, this::sendToEventHub);
  }
  
  private void sendToEventHub() {
    String msgStr = dataGenerator();
    // System.out.println(msgStr);
    try {
      AutoScaleOnIngress.autoScaleToEventHub(msgStr, ConfigEnv.NAMESPACE_NAME, ConfigEnv.AGGREGATE_HUB_NAME, ConfigEnv.SASKEY_NAME, ConfigEnv.SAS_KEY);
      // AutoScaleOnIngress.autoScaleToEventHub(Recon.toString(dataGenerator()), "FlightInfo-Event-Hub", "countshub", "RootManageSharedAccessKey", "/YGVFRTPSZCFZguDN88R+CVk699UIa7Fl8akJc0npuk=");
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    setEventHubTimer();
  }  

  private String dataGenerator() {
    final StringBuilder sb = new StringBuilder();
    final long tm = System.currentTimeMillis();
      sb.append("{\"onGroundCount\":");
      sb.append(this.onGroundCount.get());
      sb.append(",\"inAirCount\":");
      sb.append(this.inAirCount.get());
      sb.append(",\"callsignCount\":");
      sb.append(this.callsignCount.get());
      sb.append(",\"timestamp\":");
      sb.append(this.currentSimTime.get());
      sb.append("}");
      sb.append(System.lineSeparator());
    return sb.toString();    
  }

}