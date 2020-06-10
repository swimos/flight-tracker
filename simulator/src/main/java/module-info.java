open module swim.simulator {
  requires transitive swim.api;
  requires swim.server;
  requires swim.client;
  requires swim.xml;

  requires azure.eventhubs;
  requires org.apache.httpcomponents.httpclient;
  requires org.apache.httpcomponents.httpcore;
  requires iot.device.client;

  requires org.apache.httpcomponents.httpasyncclient;
  requires org.apache.httpcomponents.httpcore.nio;
  requires commons.math3;  

  requires java.xml;

  exports swim.simulator;
}
