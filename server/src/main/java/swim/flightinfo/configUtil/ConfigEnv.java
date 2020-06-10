package swim.flightinfo.configUtil;

public class ConfigEnv {
  /**
   * Device ID
   */
  public static final String DEVICE_ID = System.getenv("DEVICE_ID");

  /**
   * Transit Service Host Uri
   */
  public static final String TRANSIT_HOST_URI = "warps://transit.swim.services";

  /**
   * Azure IoT Hub Switch and Credential Connection String
   */
  public static final String IOTHUB_SWITCH = upCaseCorrect(System.getenv("IOTHUB_SWITCH"));
  public static final String CONNSTRING = System.getenv("CONNSTRING");

  /**
   * Azure Event Hub Switch, Name and Credential SAS Key
   */
  public static final String EH_SWITCH = upCaseCorrect(System.getenv("EH_SWITCH"));
  public static final String NAMESPACE_NAME = System.getenv("NAMESPACE_NAME");
  public static final String AGGREGATE_HUB_NAME = System.getenv("AGGREGATE_HUB_NAME");
  public static final String AIRPLANE_HUB_NAME = System.getenv("AIRPLANE_HUB_NAME");
  public static final String SASKEY_NAME = System.getenv("SASKEY_NAME");
  public static final String SAS_KEY = System.getenv("SAS_KEY");

  /**
   * Swim Remote Server IP and Port
   */
  public static final String SWIM_REMOTE_SERVER_IP = System.getenv("SWIM_REMOTE_SERVER_IP");
  public static final String SWIM_REMOTE_SERVER_PORT = System.getenv("SWIM_REMOTE_SERVER_PORT");

  /**
   * Helper function that standards parsing environment variable to uniform uppercase
   * @param env
   * @return null or env.trim().toUpperCase()
   */
  private static String upCaseCorrect(String env) {
    if (env == null) {
      return null;
    } else return env.trim().toUpperCase();
  }
}
