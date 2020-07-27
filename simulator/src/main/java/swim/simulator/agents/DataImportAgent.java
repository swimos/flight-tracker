package swim.simulator.agents;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.ValueLane;
import swim.api.lane.MapLane;
import swim.structure.Value;
import swim.structure.Record;
import swim.uri.Uri;

/**
 * Base class used by the data bridge agents
 * and contains utils for reading and managing csv data
 */
public class DataImportAgent extends AbstractAgent {

    public String sourceFile;
    public String sourceDirectory;
    public String targetDirectory;
    public String sourceDataFile;
    public String targetDataFile;
    public String absolutePathIn;
    public String absolutePathOut;
    public String[] columnNames;
    public char delimiter = ',';

    private Value fileConfig;
    private Integer totalRows = 0;

    /**
     * map lane to hold the raw file contents of a csv
     * each row of the map relates to each line of the csv
     */
    @SwimLane("fileContent")
    MapLane<Integer, String> fileContent;    

    /**
     * map lane of parsable csv data read in from the csv file
     */
    @SwimLane("cvsData")
    public MapLane<Integer, Record> csvData;

    /**
     * holds a Record of the results of the csv import
     * such as number of records imported and total time taken
     */
    @SwimLane("csvFileInfo")
    public ValueLane<Record> csvFileInfo = this.<Record>valueLane();

    @Override
    public void didStart() {
        // String logMsg = "Data Import Agent: Agent started";
        // command(Uri.parse("ws://127.0.0.1:9002"), Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject(logMsg));        
        Record csvInfo = Record.create()
            .slot("isImported", false)
            .slot("totalRows", 0)
            .slot("startTime", 0l)
            .slot("endTime", 0l)
            .slot("importTimeMS", 0l);
        this.csvFileInfo.set(csvInfo);
        // this.startupTime.set(System.currentTimeMillis());
    }   

    public void initialize(Value agentConfig, Value csvConfig, String csvFileName) {
        this.sourceDirectory = csvConfig.get("csvInFolder").stringValue();
        this.targetDirectory = csvConfig.get("csvOutFolder").stringValue();
        this.sourceDataFile = agentConfig.get("fileIn").stringValue();
        this.targetDataFile = agentConfig.get("fileOut").stringValue();
        this.absolutePathIn = this.sourceDirectory + this.sourceDataFile;
        this.absolutePathOut = this.targetDirectory + this.targetDataFile;
        this.columnNames = agentConfig.get("columns").stringValue().split(String.valueOf(this.delimiter));
        if(agentConfig.get("enabled").booleanValue() == true) {
            if(this.bufferFileContents()) {
                this.readCsvFile();
                System.out.println(this.absolutePathIn + " config ready");
                command(Uri.parse("warp://127.0.0.1:9002"), Uri.parse("/simulator"), Uri.parse("addCsvFile"), agentConfig);
            }        
            
        }
        
    }

    /**
     * read in each line of the csv file and store 
     * each one in fileContents lane and 
     * update csvInfo with the results. 
     * csvInfo is visible on wayback page.
     */
    private boolean bufferFileContents() {
        Integer lineCount = 0;
        try(BufferedReader bufferedReader = new BufferedReader(new FileReader(this.absolutePathIn))) {  
            String line = bufferedReader.readLine();
            String templateContent = line;
            while(line != null) {
                this.fileContent.put(this.fileContent.size(), line);
                line = bufferedReader.readLine();
                lineCount++;
            }  

            String logMsg = "Read " + lineCount.toString() + " lines";
            command(Uri.parse("warp://127.0.0.1:9002"), Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject(logMsg));        
    
            Record csvInfo = this.csvFileInfo.get().branch();

            Long endTime = System.currentTimeMillis();
            Long startTime = csvInfo.get("startTime").longValue();
            Long totalTimeMS = endTime - startTime;

            csvInfo.putSlot("isImported", true);
            csvInfo.putSlot("totalRows", lineCount);
            csvInfo.putSlot("endTime", endTime);
            csvInfo.putSlot("importTimeMS", totalTimeMS);
            // System.out.println(csvInfo);
            this.csvFileInfo.set(csvInfo);
            return true;
        } catch (FileNotFoundException e) {
            System.out.println("File not found:" + this.absolutePathIn);
            return false;
        } catch (IOException e) {
            System.out.println("error reading file");
            return false;
        }          
    }

    /**
     * read each row of fileContent lane and convert it 
     * into something that can be parsed
     */
    public void readCsvFile() {

        String logMsg = "Data Import Agent: Read csv data";
        command(Uri.parse("warp://127.0.0.1:9002"), Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject(logMsg));        

        Record csvInfo = this.csvFileInfo.get().branch();
        csvInfo.putSlot("startTime", System.currentTimeMillis());
        this.csvFileInfo.set(csvInfo);

        Integer rowsRead = 0;
        for(Integer lineNumber = 1; lineNumber < this.fileContent.size(); lineNumber++) {
            String rowContent = this.fileContent.get(lineNumber);
            String[] rowData = rowContent.split(String.valueOf(this.delimiter));
            Record row = Record.create();
            for(Integer columnNumber = 0; columnNumber < this.columnNames.length; columnNumber++) {
                String columnName = this.columnNames[columnNumber];
                if(rowData.length > columnNumber) {
                    row.put(columnName, rowData[columnNumber]);
                }
            }
            this.csvData.put(this.csvData.size(), row);
            rowsRead++;
        }
        this.totalRows = rowsRead;
        System.out.println("Data Import Agent: rows read: " + this.totalRows);
    }
 

    public void saveToCsv(String fileContent) {
        String logMsg = "Save:" + this.absolutePathOut;
        command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject(logMsg));        

        try(FileOutputStream fileOutputStream = new FileOutputStream(this.absolutePathOut)) {  
          fileOutputStream.write(fileContent.getBytes());
          command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Save Complete"));        
        } catch (FileNotFoundException e) {
            // System.out.println("file not saved" + this.absolutePathOut);
            // System.out.println(e);
        } catch (IOException e) {
          System.out.println("file write error");
            // exception handling
        }          
    }    
}