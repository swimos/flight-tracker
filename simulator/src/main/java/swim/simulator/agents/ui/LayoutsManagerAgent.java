package swim.simulator.agents.ui;

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
import swim.uri.Uri;

public class LayoutsManagerAgent extends AbstractAgent {

  @SwimLane("layoutList")
  MapLane<String, String> layoutList = this.<String, String>mapLane();

  @SwimLane("addLayout")
  public CommandLane<String> addLayoutStr = this.<String>commandLane()
    .onCommand((String layoutData) -> {
      if(layoutData.length() != 0) {
        Value  obj = Json.parse(layoutData); 
        String layoutId = obj.get("layoutId").stringValue();
        final long newTime = System.currentTimeMillis();
        obj.updated("createDate", Value.fromObject(newTime));
        obj.updated("lastEdit", Value.fromObject(newTime));

        command(Uri.parse("/layout/" + layoutId), Uri.parse("updateTemplate"), obj);   
        layoutList.put(layoutId, obj.get("title").stringValue());
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

        command(Uri.parse("/layout/" + layoutId), Uri.parse("updateTemplate"), obj);   
        layoutList.put(layoutId, obj.get("title").stringValue());

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
            // System.out.println(templateContent);
            Value obj = Json.parse(templateContent); 
            command(Uri.parse("/layout/" + obj.get("layoutId").stringValue()), Uri.parse("updateTemplate"), obj);   
            layoutList.put(obj.get("layoutId").stringValue(), obj.get("title").stringValue());          

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
        System.out.println("file not found");
    } catch (IOException e) {
      System.out.println("file write error");
        // exception handling
    }      
  }
}
