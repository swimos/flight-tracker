package swim.simulator.agents.bridges;

import java.io.File;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;

import swim.api.SwimLane;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.api.lane.MapLane;
import swim.concurrent.TimerRef;
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
public class WeatherDataAgent extends DataImportAgent {

    private Value config = ConfigEnv.config;
    private Value csvConfig = config.get("csvFiles").get("weather");
    private boolean apiQueryEnabled = csvConfig.get("apiQueryAutoStart").booleanValue(false);
    private Integer apiQueryInterval = csvConfig.get("apiQueryInterval").intValue();
    private String rootApiUrl = csvConfig.get("apiUrl").stringValue("");
    private String gairmetDataUrl = rootApiUrl + csvConfig.get("apiQueryParams").stringValue("");
    private TimerRef refreshTimer;

    @SwimLane("rawData")
    MapLane<String, String> rawData;

    @SwimLane("startupTime")
    ValueLane<Long> startupTime;

    @SwimLane("syncApp")
    public CommandLane<Value> syncAppCommand = this.<Value>commandLane()
        .onCommand((Value newVectorRecord) -> {
            this.readCsvFile();
        });      

    @SwimLane("queryApi")
    public CommandLane<Value> queryApi = this.<Value>commandLane()
        .onCommand((Value newValue) -> {
            if(newValue.booleanValue()) {
                System.out.println("Weather Data Agent: enable api query" + this.gairmetDataUrl);
                // command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("OpenSky: enable api query"));
                this.apiQueryEnabled = true;
                this.requestWeatherData();
            } else {
                System.out.println("Weather Data Agent: disable api query");
                command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Weather Data Agent: disable api query"));
                this.apiQueryEnabled = false;
            }
        });         
      
    /**
    * Standard startup method called automatically when WebAgent is created
    */
    @Override
    public void didStart() {
        super.didStart();
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Weather Data Agent: Agent started"));
        // this.startupTime.set(System.currentTimeMillis());
        // readAirportDataFile();
        this.initialize(config, "weather");
        if(this.apiQueryEnabled) {
            this.requestWeatherData();
        }

    }    

    private void startRefreshTimer() {
        if(this.apiQueryEnabled) {
            refreshTimer = setTimer(this.apiQueryInterval, this::requestWeatherData);
        }
    }      

    private InputStream parse(URL url) {
        final HttpURLConnection urlConnection;
        try {
          urlConnection = (HttpURLConnection) url.openConnection();
          final InputStream stream = urlConnection.getInputStream();
          return stream;
        } catch (Throwable e) {
          e.printStackTrace();
        }
        return null;
    }

    public void requestWeatherData() {
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Weather Data Agent: start requestWeatherData"));
        try {
            final InputStream weatherData = parse(new URL(this.gairmetDataUrl));

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();        

            Document document = builder.parse(weatherData);   
            this.parseXml(document);
        } catch (Exception e) {
          System.out.println("fail: weather api error");
          System.out.println(e);
          command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("fail: weather api error"));
        }
        if(this.apiQueryEnabled) {
            this.startRefreshTimer();
        }
    }

    public void readCsvFile() {
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Weather Data Agent: start reading file"));
        Record csvInfo = this.csvFileInfo.get().branch();
        csvInfo.putSlot("startTime", System.currentTimeMillis());
        this.csvFileInfo.set(csvInfo);


        try {

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();        
            File inputFile = new File(this.absolutePathIn);
            Document document = builder.parse(inputFile);   
            this.parseXml(document);
        } catch(Exception ex) {
            System.out.println(ex);
        }

    }

    public void parseXml(Document document) {
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Weather Data Agent: parse xml document"));
        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("clearGairmetWeather"), Value.absent());
        String finalCsvOut = "product,tag,hazardType,hazardSeverity,wxDetails,receiptTime,issueTime,expireTime,validTime,altitudeMin,altitudeMax\n";
        NodeList nodeList = document.getDocumentElement().getChildNodes();
        
        for (int i = 0; i < nodeList.getLength(); i++) {
             Node node = nodeList.item(i);

            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element elem = (Element) node;
                // System.out.println(elem);
                if(elem.getElementsByTagName("GAIRMET").getLength() > 0) {
                    NodeList dataNodes = elem.getElementsByTagName("GAIRMET");
                    System.out.println(dataNodes.getLength());

                    // each node is a GAIRMET weather node
                    for(int x = 0; x < dataNodes.getLength(); x++) {
                        Node dataNode = dataNodes.item(x);
                        Element nodeElem = (Element) dataNode;
                        Element areaElem = (Element) nodeElem.getElementsByTagName("area").item(0);
                        NodeList areaPoints = areaElem.getElementsByTagName("point");
                        String hazardType = nodeElem.getElementsByTagName("hazard").item(0).getAttributes().getNamedItem("type").getNodeValue();
                        String product = nodeElem.getElementsByTagName("product").item(0).getChildNodes().item(0).getNodeValue();
                        String tag = nodeElem.getElementsByTagName("tag").item(0).getChildNodes().item(0).getNodeValue();
                        String wxDetails = "";//
                        if(nodeElem.getElementsByTagName("wx_details").getLength() > 0) {
                            wxDetails = nodeElem.getElementsByTagName("wx_details").item(0).getChildNodes().item(0).getNodeValue();
                        }
                        String receiptTime = nodeElem.getElementsByTagName("receipt_time").item(0).getChildNodes().item(0).getNodeValue();
                        String issueTime = nodeElem.getElementsByTagName("issue_time").item(0).getChildNodes().item(0).getNodeValue();
                        String expireTime = nodeElem.getElementsByTagName("expire_time").item(0).getChildNodes().item(0).getNodeValue();
                        String validTime = nodeElem.getElementsByTagName("valid_time").item(0).getChildNodes().item(0).getNodeValue();
                        String geometryType = nodeElem.getElementsByTagName("geometry_type").item(0).getChildNodes().item(0).getNodeValue();
                        String hazardSeverity = "";
                        if(nodeElem.getElementsByTagName("hazard").item(0).getAttributes().getNamedItem("severity") != null) {
                            hazardSeverity = nodeElem.getElementsByTagName("hazard").item(0).getAttributes().getNamedItem("severity").getNodeValue();
                        }
                        String altitudeMin =  "";
                        String altitudeMax =  "";
                        // System.out.println(x);
                        if(nodeElem.getElementsByTagName("altitude").getLength() > 0) {
                            // System.out.println(nodeElem.getElementsByTagName("altitude").item(0).getAttributes().getLength());
                            NamedNodeMap attrList = nodeElem.getElementsByTagName("altitude").item(0).getAttributes();
                            // System.out.println(attrList.getNamedItem("min_ft_msl"));
                            if(attrList.getNamedItem("min_ft_msl") != null) {
                                altitudeMin =  attrList.getNamedItem("min_ft_msl").getNodeValue();
                            }
                            if(attrList.getNamedItem("max_ft_msl") != null) {
                                altitudeMax =  attrList.getNamedItem("max_ft_msl").getNodeValue();
                            }
                            

                        }

                        finalCsvOut += product + "," + tag + "," + hazardType + "," + hazardSeverity + "," + wxDetails + "," + receiptTime + "," + issueTime + "," + expireTime + "," + validTime + "," + altitudeMin + "," + altitudeMax + "\n";
                        String msg = "{"
                        +  "\"product\":\"" + product + "\","
                        +  "\"tag\":\"" + tag + "\","
                        +  "\"hazard_type\":\"" + hazardType + "\","
                        +  "\"hazard_severity\":\"" + hazardSeverity + "\","
                        +  "\"wx_details\":\"" + wxDetails + "\","
                        +  "\"receipt_time\":\"" + receiptTime + "\","
                        +  "\"issue_time\":\"" + issueTime + "\","
                        +  "\"expire_time\":\"" + expireTime + "\","
                        +  "\"valid_time\":\"" + validTime + "\","
                        +  "\"altitude_minimum\":\"" + altitudeMin + "\","
                        +  "\"altitude_maximum\":\"" + altitudeMax + "\","
                        +  "\"geometry_type\":\"" + geometryType + "\","
                        +  "\"points\":\"[";

                        for(int n = 0; n < areaPoints.getLength(); n++) {
                            Element currentPoint = (Element) areaPoints.item(n);
                            String longitude = currentPoint.getElementsByTagName("longitude").item(0).getChildNodes().item(0).getNodeValue();
                            String latitude = currentPoint.getElementsByTagName("latitude").item(0).getChildNodes().item(0).getNodeValue();
                            msg += "{'lng':'" + longitude + "','lat':'" + latitude + "'}";
                            if(n != (areaPoints.getLength()-1)) {
                                msg += ",";
                            }
                        }

                        msg += "]\""
                        + "}";

                        command(Uri.parse("warp://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("addGairmetWeather"), Value.fromObject(msg));
                        // System.out.println(Json.parse(msg));
                        // System.out.println(areaPoints.getLength());
                    }
                    
                }
            }
        }      
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Weather Data Agent: parse complete"));      
    }
}