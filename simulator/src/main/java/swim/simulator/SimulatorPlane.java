package swim.simulator;


import swim.api.space.Space;
import swim.api.SwimRoute;
import swim.api.agent.AgentRoute;
import swim.api.plane.AbstractPlane;
import swim.client.ClientRuntime;
import swim.kernel.Kernel;
import swim.server.ServerLoader;
import swim.simulator.agents.ApiRequestAgent;
import swim.simulator.agents.SimulatorAgent;
import swim.simulator.agents.bridges.AirportsImportAgent;
import swim.simulator.agents.bridges.OpenSkyAgent;
import swim.simulator.agents.bridges.WeatherDataAgent;
import swim.simulator.agents.bridges.CountriesImportAgent;
import swim.simulator.agents.ui.LayoutAgent;
import swim.simulator.agents.ui.LayoutsManagerAgent;
import swim.structure.Value;
import swim.uri.Uri;
import swim.simulator.configUtil.ConfigEnv;

/**
  The SimulatorPlane is the top level of the app.
  This Swim Plane defines the routes to each WebAgent
 */
public class SimulatorPlane extends AbstractPlane {

  public static void main(String[] args) throws InterruptedException {
    
    ConfigEnv.loadConfig();

    final Kernel kernel = ServerLoader.loadServer();
    final Space space = (Space) kernel.getSpace("simulator");

    kernel.start();
    System.out.println("Running Wayback Simulator plane...");
    kernel.run();

    final ClientRuntime client = new ClientRuntime();
    client.start();

    space.command(Uri.parse("/simulator"), Uri.parse("addJavaLog"), Value.fromObject("Running Wayback Simulator plane..."));

    space.command(Uri.parse("ws://127.0.0.1:9001"), Uri.parse("/aggregation"), Uri.parse("updateConfig"), ConfigEnv.config);
    space.command(Uri.parse("/bridge/airports"), Uri.parse("start"), Value.absent());
    space.command(Uri.parse("/bridge/opensky"), Uri.parse("start"), Value.absent());
    space.command(Uri.parse("/bridge/weather"), Uri.parse("start"), Value.absent());
    space.command(Uri.parse("/bridge/countries"), Uri.parse("start"), Value.absent());
  }
}
