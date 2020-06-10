package swim.simulator.agents.bridges;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;
import java.util.zip.GZIPInputStream;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

import swim.codec.Utf8;
import swim.api.SwimLane;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.api.lane.MapLane;
import swim.concurrent.TimerRef;
import swim.json.Json;
import swim.simulator.agents.DataImportAgent;
import swim.structure.Value;
import swim.structure.Record;
import swim.structure.Text;
import swim.structure.Item;
import swim.uri.Uri;
import swim.util.Cursor;
import swim.simulator.configUtil.ConfigEnv;

public class OpenSkyAgent extends DataImportAgent {

  private Value config = ConfigEnv.config;
  private Value csvConfig = config.get("csvFiles").get("airplanes");
  private Double currentCenterLat = config.get("map").get("queryCenterPoint").getItem(0).doubleValue(0.0);
  private Double currentCenterLong = config.get("map").get("queryCenterPoint").getItem(1).doubleValue(0.0);

  private Double targetCenterLat = config.get("map").get("uiCenterPoint").getItem(0).doubleValue(0.0);
  private Double targetCenterLong = config.get("map").get("uiCenterPoint").getItem(1).doubleValue(0.0);
  
  // private Double targetCenterLat = 35.260898;
  // private Double targetCenterLong = -116.687073;

  private Double latOffset  = (currentCenterLat - targetCenterLat);
  private Double longOffset = (currentCenterLong - targetCenterLong);

  private Double queryBoundsOffset = csvConfig.get("queryBounds").doubleValue(0.0);

  private Double boundsLatMin = currentCenterLat - queryBoundsOffset;
  private Double BoundsLongMin = currentCenterLong - (queryBoundsOffset * 1.5);
  private Double boundsLatMax = currentCenterLat + queryBoundsOffset;
  private Double BoundsLongMax = currentCenterLong + (queryBoundsOffset * 1.5);

  private String rootApiUrl = csvConfig.get("apiUrl").stringValue("");
  // private String airplaneStatesUrl = rootApiUrl + "/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226"; // zurich
  // private String airplaneStatesUrl = rootApiUrl + "/states/all?lamin=36.9951&lomin=-82.3425&lamax=46.3261&lomax=-64.2587"; // eastern US
  // private String airplaneStatesUrl = rootApiUrl + "/states/all?lamin=" + boundsLatMin.toString() + "&lomin=" + BoundsLongMin.toString() + "&lamax=" + boundsLatMax.toString() + "&lomax=" + BoundsLongMax.toString(); // chicago area
  // private String airplaneStatesUrl = rootApiUrl + "/states/all"; // worldwide
  private String airplaneStatesUrl = rootApiUrl + String.format(csvConfig.get("apiQueryParams").stringValue(""), boundsLatMin.toString(), BoundsLongMin.toString(), boundsLatMax.toString(), BoundsLongMax.toString());
  private String worldQueryUrl = rootApiUrl + csvConfig.get("worldQueryParam").stringValue();
  private String arrivalsUrl = rootApiUrl + "/flights/arrival?airport=";//EDDF&begin=1573162661&end=1573162661"; 
  private String departuresUrl = rootApiUrl + "/flights/departure?airport=";//EDDF&begin=1573162661&end=1573162661"; 

  private boolean apiQueryEnabled = csvConfig.get("apiQueryAutoStart").booleanValue(false);
  private Integer apiQueryInterval = csvConfig.get("apiQueryInterval").intValue();
  private TimerRef refreshTimer;
  
  private final int HISTORY_SIZE = 500;
  private final int MAX_STATE_VECTORS_SIZE = 2160; // 3 hours of data at 5 second interval

  @SwimLane("rawData")
  ValueLane<Value> rawData = this.<Value>valueLane();

  @SwimLane("stateVectors")
  MapLane<Long, Value> stateVectors = this.<Long, Value>mapLane()
    .didUpdate((key, newValue, oldValue) -> {
      this.stateVectorCount.set(this.stateVectors.size());
      command(Uri.parse("/simulator"), Uri.parse("addVectorKey"), Value.fromObject(key));
      if (this.stateVectors.size() > MAX_STATE_VECTORS_SIZE) {
        this.stateVectors.remove(this.stateVectors.getIndex(0).getKey());
      }

    })
    .didRemove((key, newValue) -> {
      this.stateVectorCount.set(this.stateVectors.size());
      command(Uri.parse("/simulator"), Uri.parse("removeVectorKey"), Value.fromObject(key));
    });
  
  @SwimLane("stateVectorCount")
  ValueLane<Integer> stateVectorCount = this.<Integer>valueLane()
    .didSet((newValue, oldValue) -> {
      final long now = System.currentTimeMillis();
      this.stateVectorCountHistory.put(now, newValue);        
    });  

  @SwimLane("stateVectorCountHistory")
  MapLane<Long, Integer> stateVectorCountHistory = this.<Long, Integer>mapLane()
    .didUpdate((key, newValue, oldValue) -> {
      if (this.stateVectorCountHistory.size() > HISTORY_SIZE) {
        this.stateVectorCountHistory.remove(this.stateVectorCountHistory.getIndex(0).getKey());
      }
    });

  @SwimLane("startupTime")
  ValueLane<Long> startupTime = this.<Long>valueLane();

  @SwimLane("lastUpdateTime")
  ValueLane<Long> lastUpdateTime = this.<Long>valueLane();

  @SwimLane("rawStateCount")
  ValueLane<Integer> rawStateCount = this.<Integer>valueLane()
    .didSet((newValue, oldValue) -> {
      final long now = System.currentTimeMillis();
      this.rawStateCountHistory.put(now, newValue);        
    });

  @SwimLane("rawStateCountHistory")
  MapLane<Long, Integer> rawStateCountHistory = this.<Long, Integer>mapLane()
    .didUpdate((key, newValue, oldValue) -> {
      if (this.rawStateCountHistory.size() > HISTORY_SIZE) {
        this.rawStateCountHistory.remove(this.rawStateCountHistory.getIndex(0).getKey());
      }
    });

  @SwimLane("importedStateCount")
  ValueLane<Integer> importedStateCount = this.<Integer>valueLane()
    .didSet((newValue, oldValue) -> {
      final long now = System.currentTimeMillis();
      this.importedStateCountHistory.put(now, newValue);        
    });


  @SwimLane("importedStateCountHistory")
  MapLane<Long, Integer> importedStateCountHistory = this.<Long, Integer>mapLane()
    .didUpdate((key, newValue, oldValue) -> {
      if (this.importedStateCountHistory.size() > HISTORY_SIZE) {
        this.importedStateCountHistory.remove(this.importedStateCountHistory.getIndex(0).getKey());
      }
    });
  
  @SwimLane("refreshStart")
  ValueLane<Long> refreshStart = this.<Long>valueLane();

  @SwimLane("refreshEnd")
  ValueLane<Long> refreshEnd = this.<Long>valueLane()
    .didSet((newValue, oldValue) -> {
      Long timeDiff = newValue - refreshStart.get();
      this.refreshTotal.set(timeDiff);
    });

  @SwimLane("refreshTotal")
  ValueLane<Long> refreshTotal = this.<Long>valueLane()
    .didSet((newValue, oldValue) -> {
      final long now = System.currentTimeMillis();
      this.refreshTotalHistory.put(now, newValue);         
    });

  @SwimLane("refreshTotalHistory")
  MapLane<Long, Long> refreshTotalHistory = this.<Long, Long>mapLane()
    .didUpdate((key, newValue, oldValue) -> {
      if (this.refreshTotalHistory.size() > HISTORY_SIZE) {
        this.refreshTotalHistory.remove(this.refreshTotalHistory.getIndex(0).getKey());
      }
    });

  @SwimLane("apiRequestStart")
  ValueLane<Long> apiRequestStart = this.<Long>valueLane();

  @SwimLane("apiRequestEnd")
  ValueLane<Long> apiRequestEnd = this.<Long>valueLane()
    .didSet((newValue, oldValue) -> {
      Long timeDiff = newValue - apiRequestStart.get();
      this.apiRequestTotal.set(timeDiff);
    });

  @SwimLane("apiRequestTotal")
  ValueLane<Long> apiRequestTotal = this.<Long>valueLane()
    .didSet((newValue, oldValue) -> {
      final long now = System.currentTimeMillis();
      this.apiRequestTotalHistory.put(now, newValue);         
    });

  @SwimLane("apiRequestTotalHistory")
  MapLane<Long, Long> apiRequestTotalHistory = this.<Long, Long>mapLane()
    .didUpdate((key, newValue, oldValue) -> {
      if (this.apiRequestTotalHistory.size() > HISTORY_SIZE) {
        this.apiRequestTotalHistory.remove(this.apiRequestTotalHistory.getIndex(0).getKey());
      }
    });

  @SwimLane("recordProcessingStart")
  ValueLane<Long> recordProcessingStart = this.<Long>valueLane();

  @SwimLane("recordProcessingEnd")
  ValueLane<Long> recordProcessingEnd = this.<Long>valueLane()
    .didSet((newValue, oldValue) -> {
      Long timeDiff = newValue - recordProcessingStart.get();
      this.recordProcessingTotal.set(timeDiff);
    });

  @SwimLane("recordProcessingTotal")
  ValueLane<Long> recordProcessingTotal = this.<Long>valueLane()
    .didSet((newValue, oldValue) -> {
      final long now = System.currentTimeMillis();
      this.recordProcessingTotalHistory.put(now, newValue);         
    });

  @SwimLane("recordProcessingTotalHistory")
  MapLane<Long, Long> recordProcessingTotalHistory = this.<Long, Long>mapLane()
    .didUpdate((key, newValue, oldValue) -> {
      if (this.recordProcessingTotalHistory.size() > HISTORY_SIZE) {
        this.recordProcessingTotalHistory.remove(this.recordProcessingTotalHistory.getIndex(0).getKey());
      }
    });  

  @SwimLane("writeCsv")
  public CommandLane<Value> writeCsv = this.<Value>commandLane()
      .onCommand((Value newValue) -> {
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: Save States to Csv"));
        this.saveStatesToFile();
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: Done"));
      });       
      
  @SwimLane("readCsv")
  public CommandLane<Value> readCsv = this.<Value>commandLane()
      .onCommand((Value newValue) -> {
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: Read States from Csv"));
        this.readStatesFromFile();
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: Read Complete"));
      });        

  @SwimLane("queryApi")
  public CommandLane<Value> queryApi = this.<Value>commandLane()
      .onCommand((Value newValue) -> {
        if(newValue.booleanValue(false)) {
          // System.out.println("OpenSky: enable api query");
          command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky: enable api query"));
          this.apiQueryEnabled = true;
          this.requestStateVectors();
        } else {
          // System.out.println("OpenSky: disable api query");
          command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky: disable api query"));
          this.apiQueryEnabled = false;
        }
        // command(Uri.parse("/simulator"), Uri.parse("setApiQueryState"), Value.fromObject(this.apiQueryEnabled));
      });         

  @SwimLane("sendVectorToApp")
  public CommandLane<Value> sendVectorToApp = this.<Value>commandLane()
      .onCommand((Value newValue) -> {
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: send vector to app"));
        // System.out.println(this.stateVectors.get(newValue.longValue()));
        command(Uri.parse("ws://127.0.0.1:9001"), Uri.parse("/bridge/airplaneData"), Uri.parse("receiveVectorRecord"), this.stateVectors.get(newValue.longValue()));
        command(Uri.parse("ws://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("setSimTime"), newValue);
      }); 
  

  @SwimLane("purgeData")
  public CommandLane<Value> purgeDataCommand = this.<Value>commandLane()
      .onCommand((Value newValue) -> {
        System.out.println("OpenSky: purge airport data");
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky: purge airport data"));

        Cursor<Long> recordCursor = this.stateVectors.keyIterator();

        while(recordCursor.hasNext()) {
          Long currKey = recordCursor.next();
          Value currRecord = this.stateVectors.remove(currKey);
        }
        this.importedStateCount.set(0);

        Record csvInfo = this.csvFileInfo.get().branch();

        Long endTime = 0l;
        Long startTime = 0l;
        Long totalTimeMS = 0l;
    
        csvInfo.putSlot("isImported", false);
        csvInfo.putSlot("totalRows", 0);
        csvInfo.putSlot("endTime", endTime);
        csvInfo.putSlot("importTimeMS", totalTimeMS);
        // System.out.println(csvInfo);
        this.csvFileInfo.set(csvInfo);
    
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: Purge complete"));
        command(Uri.parse("/simulator"), Uri.parse("updateTickCount"), Value.absent());
        // System.out.println(this.stateVectors.get(newValue.longValue()));
        // command(Uri.parse("ws://127.0.0.1:9001"), Uri.parse("/bridge/airplaneData"), Uri.parse("receiveVectorRecord"), this.stateVectors.get(newValue.longValue()));
        // command(Uri.parse("ws://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("setSimTime"), newValue);
      });       

    @SwimLane("receiveApiData")
    public CommandLane<Value> receiveApiDataCommand = this.<Value>commandLane()
        .onCommand((Value allStates) -> {
          // final Value allStates = parse(new URL(airplaneStatesUrl));
          if (!allStates.isDefined()) {
            System.out.println("fail: no state vectors returned");
            if(this.apiQueryEnabled) {
              startRefreshTimer();
            }
          } else {
            int totalRawStates = allStates.get("states").length();
            this.rawStateCount.set(totalRawStates);
            this.rawData.set(allStates);

            // this.apiRequestEnd.set(System.currentTimeMillis());
            processStateVectors(System.currentTimeMillis(), allStates.get("states"));
          }
          this.refreshEnd.set(System.currentTimeMillis());
          this.lastUpdateTime.set(this.refreshEnd.get());
          command(Uri.parse("/simulator"), Uri.parse("updateTickCount"), Value.absent());
      
          command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: requestStateVectors complete"));
          // requestAirportArrivals(airportInfo.get("code").stringValue(), airportInfo.get("id").stringValue());
        });         

  /**
   * Standard startup method called automatically when WebAgent is created
   */
  @Override
  public void didStart() {
    command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: Agent started"));
    super.didStart();
    this.startupTime.set(System.currentTimeMillis());
    this.rawStateCount.set(0);
    this.importedStateCount.set(0);
    this.stateVectorCount.set(0);
    this.refreshTotal.set(0l);
    this.apiRequestTotal.set(0l);
    this.recordProcessingTotal.set(0l);
    if(csvConfig.get("preloadFromCsv").booleanValue() == true) {
      this.readStatesFromFile();
    }
    if(this.apiQueryEnabled) {
      requestStateVectors();
    }
  }

  /**
    Method which creates the data purge timer
   */
  private void startRefreshTimer() {
    if(this.apiQueryEnabled) {
      refreshTimer = setTimer(this.apiQueryInterval, this::requestStateVectors);
    }
  }  
    
  private void requestStateVectors() {
    if(!this.apiQueryEnabled) {
      return;
    }
    String queryUrl = this.airplaneStatesUrl;
    if(csvConfig.get("queryWorld").booleanValue() == true) {
      queryUrl = this.worldQueryUrl;
    }
    // System.out.println("OpenSky Agent: start requestStateVectors from " + queryUrl);
    command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky Agent: start requestStateVectors"));

    this.refreshStart.set(System.currentTimeMillis());
    
    Record apiRequestInfo = Record.create()
      .slot("targetHost", "warp://127.0.0.1:9002")
      .slot("targetAgent", "/bridge/opensky")
      .slot("targetLane", "receiveApiData")
      .slot("apiUrl", queryUrl);
    
    command(Uri.parse("/apiRequestAgent/openSky"), Uri.parse("makeRequest"), apiRequestInfo);

    
  }

  private void processStateVectors(Long recordTimestamp, Value stateVectors) {
    this.recordProcessingStart.set(System.currentTimeMillis());
   
    final Iterator<Item> it = stateVectors.iterator();

    Integer statesImported = this.importedStateCount.get();
    while (it.hasNext()) {
      final Item stateVector = it.next();
      if(stateVector.getItem(1) != Text.empty()) {
        statesImported++;
      }
    }
    this.stateVectors.put(recordTimestamp, stateVectors);
    this.importedStateCount.set(statesImported);
    this.recordProcessingEnd.set(System.currentTimeMillis());
    // System.out.println("OpenSky Agent: complete processStateVectors");
    // saveStatesToFile();

    Record csvInfo = this.csvFileInfo.get().branch();

    Long endTime = this.recordProcessingEnd.get().longValue();
    Long startTime = csvInfo.get("startTime").longValue();
    Long totalTimeMS = endTime - startTime;

    csvInfo.putSlot("isImported", true);
    csvInfo.putSlot("totalRows", statesImported);
    csvInfo.putSlot("endTime", endTime);
    csvInfo.putSlot("importTimeMS", totalTimeMS);
    // System.out.println(csvInfo);
    this.csvFileInfo.set(csvInfo);

    if(this.apiQueryEnabled) {
      startRefreshTimer();
    }
  }

  private String parseUri(String uri) {
    try {
      return java.net.URLEncoder.encode(uri, "UTF-8").toString();
    } catch (UnsupportedEncodingException e) {
      return null;
    }
  }

  private Value parse(URL url) {
    final HttpURLConnection urlConnection;
    try {
      urlConnection = (HttpURLConnection) url.openConnection();
      urlConnection.setRequestProperty("Accept-Encoding", "gzip, deflate");
      final InputStream stream = new GZIPInputStream(urlConnection.getInputStream());
      // final InputStream stream = urlConnection.getInputStream();
      final Value configValue = Utf8.read(Json.parser(), stream);
      return configValue;
    } catch (Throwable e) {
      e.printStackTrace();
    }
    return Value.absent();
  }

  public void saveStatesToFile() {
    String directory = "../rawData/in";
    String fileName = "stateVectorImport.csv";  
    String absolutePath = directory + File.separator + fileName;

    Cursor<Long> recordCursor = this.stateVectors.keyIterator();
    // MapList<String, String> fileContent = new MapList();
    String fileContent = new String();
    fileContent = "";
    while(recordCursor.hasNext()) {
      Long currKey = recordCursor.next();
      Value currRecord = this.stateVectors.get(currKey);
      String recordString = Json.toString(Item.fromObject(currRecord));
      fileContent += currKey.toString() + "::" +  recordString + "\n";
    }
    
    System.out.println("Save:" + absolutePath);
    try(FileOutputStream fileOutputStream = new FileOutputStream(absolutePath)) {  
      fileOutputStream.write(fileContent.getBytes());
    } catch (FileNotFoundException e) {
        System.out.println("opensky out file not found");
    } catch (IOException e) {
      System.out.println("file write error");
        // exception handling
    }      
  }  

  private void readStatesFromFile() {
    String directory = "../rawData/in";
    String fileName = "stateVectorImport.csv";  
    String absolutePath = directory + File.separator + fileName;
    System.out.println("OpenSky Agent: reading " + absolutePath);

    Record csvInfo = this.csvFileInfo.get().branch();
    csvInfo.putSlot("startTime", System.currentTimeMillis());
    this.csvFileInfo.set(csvInfo);

    try(BufferedReader bufferedReader = new BufferedReader(new FileReader(absolutePath))) {  
      String line = bufferedReader.readLine();
      String templateContent = line;
      while(line != null) {
          line = bufferedReader.readLine();
          if(line != null && line != "null") {
            Long recordTimestamp = Long.parseLong(line.split("::")[0]);
            String recordContent = line.split("::")[1];
            Value recordJson = Json.parse(recordContent);
            this.processStateVectors(recordTimestamp, recordJson);
          }
      }            

    } catch (FileNotFoundException e) {
        System.out.println("File not found:" + absolutePath);
    } catch (IOException e) {
        System.out.println("error reading file");
    }    

    if(config.get("autoStartSim").booleanValue() == true) {
      command(Uri.parse("/simulator"), Uri.parse("startSim"), Value.absent());
    }
    command(Uri.parse("/simulator"), Uri.parse("updateTickCount"), Value.absent());
    
    System.out.println("OpenSky Agent: done. ");
    // requestStateVectors();
  }

}
