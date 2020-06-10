package swim.flightinfo.configUtil;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.structure.Value;

public class ConfigAgent extends AbstractAgent {

  @SwimLane("appConfig")
  ValueLane<Value> appConfig = this.<Value>valueLane();

  @SwimLane("setConfig")
  public CommandLane<Value> setConfigCommand = this.<Value>commandLane()
    .onCommand((Value newConfig) -> {
      this.appConfig.set(newConfig);
    });  
}
