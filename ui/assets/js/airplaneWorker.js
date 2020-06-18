importScripts('/assets/js/lib/swim-system.js'); 

class AirplaneWorker {
    
    constructor() {
        this.swimUrl = null;

        this.bufferTimeoutTime = 10;
        this.bufferTimeout = null;
        this.msgBuffer = [];
    }

    start() {
        console.info('[Worker]:start');
        swim.nodeRef(this.swimUrl, 'aggregation').downlinkMap().laneUri('airplaneList')
            // when an new item is added to the list, append it to listItems
            .didUpdate((key, newValue) => {
                // add new item to listItems
                // console.info(key.stringValue())
                // const markerId = key.stringValue();
                // this.airplaneDataset[markerId] = newValue;
                // this.airplaneDataset[markerId].dirty = true;
                // this.airplaneDataDirty = true;
                this.sendUpdate(key, newValue);
            })
            .didRemove((key) => {
                const markerId = key.stringValue();
                this.sendRemove(markerId);
                // if (this.airplaneDataset[markerId]) {
                //     this.airplaneDataset[markerId].removed = true;
                //     this.airplaneDataset[markerId].dirty = true;
                    
                // }
                // this.airplaneDataDirty = true;
            })
            .didSync(() => {
                this.sendSyncMessage();
                // console.info('synced')
                // this.links["airplaneListLink"].close();
                // this.map.map.synced = true;
                // this.airplaneDataDirty = true;
                // window.requestAnimationFrame(this.drawAirplanes.bind(this));
            })
            .open();        
    }

    bufferMessage(msg) {
        this.msgBuffer.push(msg);
        this.setBufferTimer();
    }

    setBufferTimer() {
        if(this.bufferTimeout != null) {
            clearTimeout(this.bufferTimeout);
            this.bufferTimeout = null;
        }

        this.bufferTimeout = setTimeout(() => {
            this.sendBuffer();
        }, this.bufferTimeoutTime);
    }

    onMessage(evt) {
        const msgData = evt.data;
        // console.info('[Worker]:onmessage', evt);
        switch(msgData.action) {
            case "start":
                this.start();
                break;

            case "setSwimUrl":
                this.swimUrl = msgData.data;
                break;
            
        }
        
    }

    sendBuffer() {
        postMessage({"action":"bufferedUpdate","buffer": this.msgBuffer});
        this.msgBuffer = [];
    }

    sendUpdate(key, newValue) {
        // console.info('send update message', newValue);
        // postMessage({"action":"update","markerId":key.stringValue(),"newValue":newValue.toObject()});
        this.bufferMessage({"action":"update","markerId":key.stringValue(),"newValue":newValue.toObject()});
    }

    sendRemove(markerId) {
        // console.info('send remove message', markerId);
        // postMessage({"action":"remove","markerId":markerId});
        this.bufferMessage({"action":"remove","markerId":markerId});
    }

    sendSyncMessage() {
        // console.info("airplanes data sync");
        // postMessage({"action":"sync"});
        this.bufferMessage({"action":"sync"});
    }
}

const airplaneWorker = new AirplaneWorker()
onmessage = (evt) => {
    airplaneWorker.onMessage(evt);
}