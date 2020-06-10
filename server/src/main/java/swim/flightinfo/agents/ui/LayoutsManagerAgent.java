package swim.flightinfo.agents.ui;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.MapLane;
import swim.json.Json;
import swim.structure.Value;
import swim.structure.Record;
import swim.uri.Uri;

public class LayoutsManagerAgent extends AbstractAgent {

  @SwimLane("layoutListRecords")
  MapLane<String, Value> layoutListRecords = this.<String, Value>mapLane();

  @SwimLane("addLayout")
  public CommandLane<String> addLayoutStr = this.<String>commandLane()
    .onCommand((String layoutData) -> {
      if(layoutData.length() != 0) {
        // System.out.println(layoutData);
        Value  obj = Json.parse(layoutData); 
        String layoutId = obj.get("layoutId").stringValue();
        final long newTime = System.currentTimeMillis();
        obj.updated("createDate", Value.fromObject(newTime));
        obj.updated("lastEdit", Value.fromObject(newTime));

        Record layoutInfo = Record.create()
          .slot("title", obj.get("title").stringValue())
          .slot("changeDate", obj.get("lastEdit").stringValue())
          .slot("systemLayout", obj.get("systemLayout").booleanValue(false));

        layoutListRecords.put(layoutId, layoutInfo);

        command(Uri.parse("/layout/" + layoutId), Uri.parse("updateTemplate"), obj);   
        saveLayoutToFile(layoutId, Json.toString(obj));
      } else {
        System.out.println("no layout data sent in this request");
      }
    });

  @SwimLane("updateLayout")
  public CommandLane<String> updateLayoutStr = this.<String>commandLane()
    .onCommand((String layoutData) -> {
      if(layoutData.length() != 0) {
        Value obj = Json.parse(layoutData); 
        // System.out.println(layoutData);
        String layoutId = obj.get("layoutId").stringValue();
        boolean saveToFS = obj.get("saveToFS").booleanValue();
        final long newTime = System.currentTimeMillis();
        obj.updated("lastEdit", Value.fromObject(newTime));

        Record layoutInfo = Record.create()
          .slot("title", obj.get("title").stringValue())
          .slot("changeDate", obj.get("lastEdit").stringValue())
          .slot("systemLayout", obj.get("systemLayout").booleanValue(false));
        layoutListRecords.put(layoutId, layoutInfo);

        command(Uri.parse("/layout/" + layoutId), Uri.parse("updateTemplate"), obj);   
        saveLayoutToFile(layoutId, Json.toString(obj));

      } else {
        System.out.println("no layout data sent in this request");
      }
    });    

      

  /**
   * This is a command lane used to remove layouts
   */
  @SwimLane("removeLayout")
  public CommandLane<String> removeLayout = this.<String>commandLane();

  /**
   * called after the server has started
   * useful if you need to pre-populate lanes on startup
   */
  @Override
  public void didStart() {
    loadDefaultTemplates();
  }

  private void loadDefaultTemplates() {
    final File folder = new File("../templates");
    File[] listOfFiles = folder.listFiles();
    // System.out.println("Load:" + folder);
    for (final File fileEntry : listOfFiles) {
      if (!fileEntry.isDirectory()) {
            
          try(BufferedReader bufferedReader = new BufferedReader(new FileReader(fileEntry))) {  
            String line = bufferedReader.readLine();
            String templateContent = line;
            while(line != null) {
                line = bufferedReader.readLine();
                if(line != null && line != "null") {
                  templateContent += line;
                }
            }            
            Value obj = Json.parse(templateContent); 
            // System.out.println(obj.get("systemLayout"));
            Record layoutInfo = Record.create()
              .slot("title", obj.get("title").stringValue())
              .slot("changeDate", obj.get("lastEdit").stringValue())
              .slot("systemLayout", obj.get("systemLayout").booleanValue(false));
            layoutListRecords.put(obj.get("layoutId").stringValue(), Value.fromObject(layoutInfo));

            command(Uri.parse("/layout/" + obj.get("layoutId").stringValue()), Uri.parse("updateTemplate"), obj);   
  
          } catch (FileNotFoundException e) {
              System.out.println("File not found:" + "../templates" + fileEntry);
          } catch (IOException e) {
              System.out.println("error reading file");
          }
      
      } else {
          System.out.println(fileEntry.getName());
      }
    }



  }

  public void saveLayoutToFile(String layoutId, String layoutData) {
    String directory = "../templates";
    String fileName = layoutId + ".json";  
    String absolutePath = directory + File.separator + fileName;

    System.out.println("Save:" + absolutePath);
    try(FileOutputStream fileOutputStream = new FileOutputStream(absolutePath)) {  
      fileOutputStream.write(layoutData.getBytes());
    } catch (FileNotFoundException e) {
        System.out.println("template file not found");
    } catch (IOException e) {
      System.out.println("file write error");
        // exception handling
    }      
  }
}
