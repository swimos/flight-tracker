package swim.flightinfo;

import swim.api.SwimRoute;
import swim.api.agent.AgentRoute;
import swim.api.plane.AbstractPlane;
import swim.api.space.Space;
import swim.client.ClientRuntime;
import swim.flightinfo.agents.AggregationAgent;
import swim.flightinfo.agents.AirplaneAgent;
import swim.flightinfo.agents.AirportAgent;
import swim.flightinfo.agents.bridges.AirplaneDataAgent;
import swim.flightinfo.agents.ui.LayoutAgent;
import swim.flightinfo.agents.ui.LayoutsManagerAgent;
import swim.flightinfo.agents.ui.UserPrefsAgent;
import swim.flightinfo.configUtil.ConfigAgent;
import swim.kernel.Kernel;
import swim.server.ServerLoader;
import swim.structure.Value;
import swim.uri.Uri;

/**
  The ApplicationPlane is the top level of the app.
  This Swim Plane defines the routes to each WebAgent
 */
public class ApplicationPlane extends AbstractPlane {

  @SwimRoute("/aggregation")
  AgentRoute<AggregationAgent> aggregationAgent;

  @SwimRoute("/airplanes/:callsign")
  AgentRoute<AirplaneAgent> airplaneAgent;

  @SwimRoute("/airport/:id")
  AgentRoute<AirportAgent> airportAgent;

  @SwimRoute("/bridge/airplaneData")
  AgentRoute<AirplaneDataAgent> airplaneDataAgent;

  @SwimRoute("/config")
  AgentRoute<ConfigAgent> configAgent;

  @SwimRoute("/userPrefs/:userGuid")
  AgentRoute<UserPrefsAgent> userPrefsAgent;

  /**
   * The LayoutManager Agent manages the list of available layout templates,
   * loads existing templates on startup and the add/remove of templates
   */
  @SwimRoute("/layoutManager")
  AgentRoute<LayoutsManagerAgent> layoutManager;

  /**
   * The Layout Agent hold the data for an individual layout template
   */
  @SwimRoute("/layout/:id")
  AgentRoute<LayoutAgent> layoutAgent;

  public static void main(String[] args) throws InterruptedException {
    final Kernel kernel = ServerLoader.loadServer();
    final Space space = (Space) kernel.getSpace("flightInfo");

    kernel.start();
    System.out.println("Running Application plane...");
    kernel.run();

    space.command(Uri.parse("/aggregation"), Uri.parse("start"), Value.absent());
    space.command(Uri.parse("/layoutManager"), Uri.parse("start"), Value.absent());
    space.command(Uri.parse("/bridge/airplaneData"), Uri.parse("start"), Value.fromObject("start"));
    space.command(Uri.parse("warp://127.0.0.1:9002"), Uri.parse("/simulator"), Uri.parse("syncApp"), Value.absent());
    
  }
}
