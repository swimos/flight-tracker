package swim.simulator.agents;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.zip.GZIPInputStream;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.codec.Utf8;
import swim.concurrent.AbstractTask;
import swim.concurrent.TaskRef;
import swim.concurrent.TimerRef;
import swim.json.Json;
import swim.structure.Item;
import swim.structure.Value;
import swim.structure.Record;
import swim.uri.Uri;
import swim.util.Cursor;
import swim.xml.Xml;
import swim.simulator.configUtil.ConfigEnv;

public class ApiRequestAgent extends AbstractAgent {

    private Value config = ConfigEnv.config;
    private Record requestInfo;
    private TaskRef requestTask;

    @SwimLane("lastRequestTimestamp")
    ValueLane<Long> lastRequestTimestamp;    

    @SwimLane("makeRequest")
    public CommandLane<Record> makeRequestCommand = this.<Record>commandLane()
        .onCommand(this::queueRequest);       

    @Override
    public void didStart() {
        // System.out.println("api request agent started");
    }      

    private void abortRequest() {
        if (this.requestTask != null) {
        this.requestTask.cancel();
        this.requestTask = null;
        }        
    }

    private void queueRequest(Record reqInfo) {
        this.abortRequest();
        this.requestInfo = reqInfo;
        this.requestTask = asyncStage().task(new AbstractTask() {

            @Override
            public void runTask() { 
                doRequest(); 
            }

            @Override
            public boolean taskWillBlock() {
                return true;
            }
        });
        this.requestTask.cue();    
    }

    private void doRequest() {
        try {
            
            // System.out.print("requestInfo:");
            // System.out.println(this.requestInfo);
            String targetHost = this.requestInfo.get("targetHost").stringValue("warp://127.0.0.1:9001");
            String targetAgent = this.requestInfo.get("targetAgent").stringValue();
            String bufferLane = this.requestInfo.get("targetLane").stringValue();
            String apiUrl = this.requestInfo.get("apiUrl").stringValue("");
            String responseType = this.requestInfo.get("responseType").stringValue("json");
            final Value apiData;

            if(responseType.equals("xml")) {
                apiData = parseXml(new URL(apiUrl));
            } else {
                apiData = parse(new URL(apiUrl));
            }
                
            command(Uri.parse(targetHost), Uri.parse(targetAgent), Uri.parse(bufferLane), apiData); 
        } catch (Exception e) {
            System.out.println(e);
        }        
    }
    
    private Value parse(URL url) {
        final HttpURLConnection urlConnection;
        // System.out.println("OpenSky Agent: start requestStateVectors from " + url);
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

    private Value parseXml(URL url) {
        final HttpURLConnection urlConnection;
        try {
          urlConnection = (HttpURLConnection) url.openConnection();
          urlConnection.setRequestProperty("Accept-Encoding", "gzip, deflate");
          final InputStream stream = new GZIPInputStream(urlConnection.getInputStream());
          final Value configValue = Utf8.read(Xml.structureParser().documentParser(), stream);
          return configValue;
        } catch (Throwable e) {
          e.printStackTrace();
        }
        return Value.absent();
      }

}