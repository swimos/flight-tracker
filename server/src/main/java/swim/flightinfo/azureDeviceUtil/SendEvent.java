package swim.flightinfo.azureDeviceUtil;

import com.microsoft.azure.sdk.iot.device.*;
import com.microsoft.azure.sdk.iot.device.transport.IotHubConnectionStatus;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

/** Send a number of event messages to an IoT Hub */
public class SendEvent {
  private static final int D2C_MESSAGE_TIMEOUT = 2000;
  private static List failedMessageListOnClose = new ArrayList(); // List of messages that failed on close

  protected static class EventCallback implements IotHubEventCallback {
    @Override
    public void execute(IotHubStatusCode status, Object context) {
      Message msg = (Message) context;
      //System.out.println("IoT Hub responded to message " + msg.getMessageId() + " with status " + status.name());
      if (status == IotHubStatusCode.MESSAGE_CANCELLED_ONCLOSE) {
        failedMessageListOnClose.add(msg.getMessageId());
      }
    }
  }

  protected static class IotHubConnectionStatusChangeCallbackLogger implements IotHubConnectionStatusChangeCallback {
    @Override
    public void execute(IotHubConnectionStatus status, IotHubConnectionStatusChangeReason statusChangeReason,
                        Throwable throwable, Object callbackContext) {
      //System.out.println();
      //System.out.println("CONNECTION STATUS UPDATE: " + status);
      //System.out.println("CONNECTION STATUS REASON: " + statusChangeReason);
      //System.out.println("CONNECTION STATUS THROWABLE: " + (throwable == null ? "null" : throwable.getMessage()));
      //System.out.println();

      if (throwable != null) {
        throwable.printStackTrace();
      }

      if (status == IotHubConnectionStatus.DISCONNECTED) {
        //System.out.println("connection was lost, and is not being re-established. Look at provided exception for " +
        //    "how to resolve this issue. Cannot send messages until this issue is resolved, and you manually " +
        //    "re-open the device client");
      }
      else if (status == IotHubConnectionStatus.DISCONNECTED_RETRYING) {
        //System.out.println("connection was lost, but is being re-established. Can still send messages, but they won't" +
        //    " be sent until the connection is re-established");
      } else if (status == IotHubConnectionStatus.CONNECTED) {
        //System.out.println("Connection was successfully re-established. Can send messages.");
      }
    }
  }

  /**
   * Sends a number of messages to an IoT or Edge Hub. Default protocol is to
   * use MQTT transport.
   *
   * @param connString, protocolStr, msgStr
   * connString = IoT Hub or Edge Hub connection string
   * protocolStr = protocol (optional, one of 'mqtt' or 'amqps' or 'https' or 'amqps_ws')
   * msgStr = message sent to IoT Hub
   * pathToCertificate = path to certificate to enable one-way authentication over ssl. (Not necessary when connecting directly to Iot Hub, but required if connecting to an Edge device using a non public root CA certificate).
   */
  public static void sendToHub(String connString, String protocolStr, String msgStr, String pathToCertificate) throws IOException, URISyntaxException {
    //System.out.println("Starting...");
    //System.out.println("Beginning setup.");

    IotHubClientProtocol protocol;
    if (protocolStr.equals("https")) {
      protocol = IotHubClientProtocol.HTTPS;
    } else if (protocolStr.equals("amqps")) {
      protocol = IotHubClientProtocol.AMQPS;
    } else if (protocolStr.equals("mqtt")) {
      protocol = IotHubClientProtocol.MQTT;
    } else if (protocolStr.equals("amqps_ws")) {
      protocol = IotHubClientProtocol.AMQPS_WS;
    } else if (protocolStr.equals("mqtt_ws")) {
      protocol = IotHubClientProtocol.MQTT_WS;
    } else {
      System.out.format(
          "Expected argument 2 to be one of 'mqtt', 'https', 'amqps' or 'amqps_ws' but received %s\n" +
              "(mqtt | https | amqps | amqps_ws | mqtt_ws)\n" +
              protocolStr);
      return;
    }


    //System.out.println("Successfully read input parameters.");
    //System.out.format("Using communication protocol %s.\n", protocol.name());

    DeviceClient client = new DeviceClient(connString, protocol);
    if (pathToCertificate != null) {
      client.setOption("SetCertificatePath", pathToCertificate);
    }

    System.out.println("Successfully created an IoT Hub Client.");

    // Set your token expiry time limit here
    long time = 2400;
    client.setOption("SetSASTokenExpiryTime", time);
    //System.out.println("Update token expiry time to " + time);

    client.registerConnectionStatusChangeCallback(new IotHubConnectionStatusChangeCallbackLogger(), new Object());
    client.open();

    //System.out.println("Opened connection to IoT Hub.");
    //System.out.println("Sending the following event message: ");

    try {
      Message msg = new Message(msgStr);
      msg.setContentType("application/json");
      msg.setMessageId(java.util.UUID.randomUUID().toString());
      msg.setExpiryTime(D2C_MESSAGE_TIMEOUT);
      //System.out.println(msgStr);

      EventCallback callback = new EventCallback();
      client.sendEventAsync(msg, callback, msg);
    } catch (Exception e) {
      e.printStackTrace(); // Trace the exception
    }


    //System.out.println("Wait for " + D2C_MESSAGE_TIMEOUT / 1000 + "second(s) for response from the IoT Hub...");

    // Wait for IoT Hub to respond.
    try {
      Thread.sleep(D2C_MESSAGE_TIMEOUT);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    // close the connection
    //System.out.println("Closing");
    client.closeNow();

    if (!failedMessageListOnClose.isEmpty()) {
      //System.out.println("List of messages that were cancelled on close: " + failedMessageListOnClose.toString());
    }

    //System.out.println("Shutting down..");
  }
}
