class Wayback {

    constructor(swimUrl, elementId, templateId) {
        console.info("[Wayback]: constructor");
        this.swimUrl = swimUrl;
        this.simUrl = `ws://${window.location.hostname}:9002`;
        this.rootHtmlElementId = elementId;
        this.rootSwimTemplateId = templateId;
        this.apiNodeRef = swim.nodeRef(`ws://${window.location.hostname}:9002`, '/bridge/opensky');
        this.simNodeRef = swim.nodeRef(`ws://${window.location.hostname}:9002`, '/simulator');
        this.rootHtmlElement = null;
        this.rootSwimElement = null;
    
        this.appConfig = null;
        this.links = [];
        this.logEntries = [];

        this.csvFiles = [];
        
    }

    initialize() {
        console.info("[Wayback]: init");
        this.rootHtmlElement = document.getElementById(this.rootHtmlElementId);
        this.rootSwimElement = swim.HtmlView.fromNode(this.rootHtmlElement);


        this.links["csvListLink"] = swim.nodeRef(this.simUrl, '/simulator').downlinkMap().laneUri('csvFiles')
            .didUpdate((key, newValue, oldValue) => {
                console.info("csvListLink", key, newValue, oldValue);
                this.csvFiles[key.stringValue()] = newValue;
                // if (newValue !== swim.Value.absent()) {
                //     this.appConfig = newValue.toObject();
                //     // document.getElementById("mainTitle").innerText = this.appConfig.appName;
                //     // document.title = "Swim - " + this.appConfig.appName;
                //     console.info("[Wayback] app config updated", this.appConfig);
                //     swim.command(this.swimUrl, "/userPrefs/" + this.userGuid, "setGuid", this.userGuid);
                // }
                this.renderCsvList();
            });
            
            
        // this.links["appConfigLink"] = swim.nodeRef(this.swimUrl, 'config').downlinkValue().laneUri('appConfig')
        //     .didSet((newValue) => {
        //         if (newValue !== swim.Value.absent()) {
        //             this.appConfig = newValue.toObject();
        //             // document.getElementById("mainTitle").innerText = this.appConfig.appName;
        //             // document.title = "Swim - " + this.appConfig.appName;
        //             console.info("[Wayback] app config updated", this.appConfig);
        //             swim.command(this.swimUrl, "/userPrefs/" + this.userGuid, "setGuid", this.userGuid);
        //         }
        //         this.renderCsvList();
        //     });

        this.links["simTimeLink"] = swim.nodeRef(this.swimUrl, 'aggregation').downlinkValue().laneUri('currentSimTime')
            .didSet((key, newValue) => {
                this.currentSimTime = new Date(newValue.value).toLocaleString('en-US', { timeZone: 'America/Chicago' });
                let timestampDiv = this.rootSwimElement.getCachedElement("0e2c1ee8");
                if (this.currentSimTime !== "Invalid Date") {
                    timestampDiv.text("Sim Time: " + this.currentSimTime + " CST");
                } else {
                    timestampDiv.text("");
                }

            });

        this.links["simTickLink"] = swim.nodeRef(this.swimUrl, 'aggregation').downlinkValue().laneUri('currentSimTicks')
            .didSet((newValue) => {
                this.currentSimTicks = newValue;
                const progressBar = this.rootSwimElement.getCachedElement("3e5db015");
                const ticksDiv = this.rootSwimElement.getCachedElement("d1a5370e");
                

                const currTick = this.currentSimTicks.get("currentTick");
                const totalTicks = this.currentSimTicks.get("totalTicks");
                const width = currTick / totalTicks;
                progressBar.node.style.width = Math.round(width * 100) + "%";
                ticksDiv.node.innerHTML = "Sim Ticks: " + currTick + "/" + totalTicks;
                if(this.currentSimTicks.get("simRunning") !== swim.Value.absent()) {
                    const playButton = document.getElementById("85f06550");
                    playButton.removeAttribute("disabled");
                    if(this.currentSimTicks.get("simRunning").booleanValue() === true) {
                        playButton.value = "■";
                    } else {
                        playButton.value = "▶";
                    }
                }                
                if(this.currentSimTicks.get("apiQueryEnabled") !== swim.Value.absent()) {
                    const playButton = document.getElementById("c048a429");
                    playButton.removeAttribute("disabled");
                    if(this.currentSimTicks.get("apiQueryEnabled").booleanValue() === true) {
                        playButton.value = "Stop API Query";
                    } else {
                        playButton.value = "Start API Query";
                    }
                }                

            });            

        this.links["javaLogs"] = swim.nodeRef(this.simUrl, 'simulator').downlinkMap().laneUri('javaLogs')
            .didUpdate((key, newValue) => {
                this.logEntries[key] = newValue
                // console.info('javalog[sim]', key, newValue);
                // this.updateAltitudePie(key, newValue);
                // this.drawLogs();
                const logDiv = document.getElementById("c7963310");
                logDiv.innerHTML = key + ": [sim] " + newValue + "<br>" + logDiv.innerHTML;
            });

        this.links["appLogs"] = swim.nodeRef(this.simUrl, 'simulator').downlinkMap().laneUri('appLogs')
            .didUpdate((key, newValue) => {
                this.logEntries[key] = newValue
                // console.info('javalog[sim]', key, newValue);
                // this.updateAltitudePie(key, newValue);
                // this.drawLogs();
                const logDiv = document.getElementById("c7963310");
                logDiv.innerHTML = key + ": [app] " + newValue + "<br>" + logDiv.innerHTML;
            });            
        this.loadTemplate(this.rootSwimTemplateId, this.rootSwimElement, this.start.bind(this), false);
    }

    start() {
        for(const link in this.links) {
            this.links[link].open();
        }
        swim.command(page.swimUrl.replace("9001", "9002"), "/simulator", "addAppLog", "Wayback Page Opened");
    }

    loadTemplate(templateId, swimElement, onTemplateLoad = null, keepSynced = true) {
        console.info("[Wayback]: load template");
        swimElement.render(templateId, () => {
            if (onTemplateLoad) {
                onTemplateLoad();
            }
        }, keepSynced);
    }    

    renderCsvList() {
        const csvList = this.csvFiles;
        const listContainer = this.rootSwimElement.getCachedElement("bae4d6a4");
        listContainer.node.innerHTML = "<h4> CSV Files List</h4>";
        for(const csvType in csvList) {
            const currCsvInfo = csvList[csvType].toObject();
            const currRow = swim.HtmlView.create("div");
            this.links[csvType] = swim.nodeRef(this.simUrl, currCsvInfo.laneUri).downlinkValue().laneUri('csvFileInfo')
            .didSet((newValue) => {
                // console.info("csv info: " + csvType, newValue);
                currRow.node.innerHTML = "<h6>" + currCsvInfo.fileIn + "</h6>";
                currRow.node.innerHTML += "Imported: " + newValue.get("isImported") + "<br>";
                currRow.node.innerHTML += "Records: " + newValue.get("totalRows") + "<br>";
                // currRow.node.innerHTML += "Processing Time: " + newValue.get("importTimeMS") + "<br>";
                const importButton = document.createElement("input");
                importButton.type = "button";
                importButton.value = "Import";
                importButton.onmouseup = () => {
                    this.readCsv(csvType);
                }
                currRow.node.appendChild(importButton);

                // const exportButton = document.createElement("input");
                // exportButton.type = "button";
                // exportButton.value = "Export";
                // exportButton.onmouseup = () => {
                //     this.exportCsv(csvType);
                // }
                // currRow.node.appendChild(exportButton);

                if(csvType === "airplanes") {
                    const saveButton = document.createElement("input");
                    saveButton.type = "button";
                    saveButton.value = "Save";
                    saveButton.onmouseup = () => {
                        this.saveCsv(csvType);
                    }
                    currRow.node.appendChild(saveButton);

                    const purgeButton = document.createElement("input");
                    purgeButton.type = "button";
                    purgeButton.value = "Purge";
                    purgeButton.onmouseup = () => {
                        this.purgeAirplaneData(csvType);
                    }
                    currRow.node.appendChild(purgeButton);
                    
                }

                if(csvType === "weather") {
                    const saveButton = document.createElement("input");
                    saveButton.type = "button";
                    saveButton.value = "API";
                    saveButton.onmouseup = () => {
                        this.weatherApiToggle();
                    }
                    currRow.node.appendChild(saveButton);
    
                }

            })
            .open();

            listContainer.append(currRow);
            // console.info(currCsvInfo);

        }
    }

    readCsv(csvKey) {
        console.info("import: " + csvKey);
        switch(csvKey) {
            case "airplanes" :
                this.apiNodeRef.command('readCsv', true);
                break;
            default:
                const csv = this.appConfig.csvFiles[csvKey];
                swim.command(this.simUrl, this.csv.laneUri, "readCsv", true);
        }
    }

    saveCsv(csvKey) {
        console.info("save: " + csvKey);
        switch(csvKey) {
            case "airplanes" :
                this.apiNodeRef.command('writeCsv', true);
                break;
            default:
                const csv = this.appConfig.csvFiles[csvKey];
                swim.command(this.simUrl, this.csv.laneUri, "writeCsv", true);
        }
    }

    purgeAirplaneData(csvKey) {
        const csv = this.appConfig.csvFiles[csvKey];
        console.info("purge: " + csvKey);
        swim.command(this.simUrl, csv.laneUri, "purgeData", true);
    }

    exportCsv(csvKey) {
        console.info("export: " + csvKey);
        // switch(csvKey) {
        //     case "airplanes" :
        //         this.apiNodeRef.command('writeCsv', true);
        //         break;
        //     default:
        //         const csv = this.appConfig.csvFiles[csvKey];
        //         swim.command(this.simUrl, this.csv.laneUri, "writeCsv", true);
        // }
    }
    

    // readCsv() {
    //     this.apiNodeRef.command('readCsv', true);
    // }

    enableApiQuery() {
        // this.apiNodeRef.command('queryApi', true);
        swim.nodeRef(`ws://${window.location.hostname}:9002`, '/simulator').command('setApiQueryState', true);
    }
    disableApiQuery() {
        // this.apiNodeRef.command('queryApi', false);
        swim.nodeRef(`ws://${window.location.hostname}:9002`, '/simulator').command('setApiQueryState', false);
    }
    sendNextVector() {
        this.simNodeRef.command('sendNextVector', true);
    }
    startSim() {
        this.simNodeRef.command('startSim', true);
    }
    stopSim() {
        this.simNodeRef.command('stopSim', true);
    }
    clearData() {
        swim.nodeRef(this.swimUrl, '/aggregation').command('clearAirplaneData');
        swim.nodeRef(this.swimUrl, '/aggregation').command('clearGairmetWeather');
    }
    syncApp() {
        this.simNodeRef.command('syncApp', true);
    }
    resetSim() {
        this.simNodeRef.command('resetSim', true);
    }    
    toggleSim() {
        if(this.currentSimTicks.get("simRunning") !== swim.Value.absent() && this.currentSimTicks.get("simRunning").booleanValue() === true) {
            this.stopSim();
        } else {
            this.startSim();
        }
    }
    weatherApiToggle() {
        swim.command(this.simUrl, "/bridge/weather", "queryApi", true);
    }
    toggleApiQuery() {
        console.info("toggle");
        const toggleButton = document.getElementById("c048a429");
        toggleButton.setAttribute("disabled", true);
        if(this.currentSimTicks.get("apiQueryEnabled").booleanValue() === true) {
            console.info('stop');
            // this.apiNodeRef.command('queryApi', false);
            this.disableApiQuery();
        } else {
            console.info('start');
            this.enableApiQuery();
        }
    }
}