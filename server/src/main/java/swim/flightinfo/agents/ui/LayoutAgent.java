package swim.flightinfo.agents.ui;

import swim.api.SwimLane;
import swim.api.agent.AbstractAgent;
import swim.api.lane.CommandLane;
import swim.api.lane.ValueLane;
import swim.structure.Value;

/**
    Each Layout created in the Layout Editor is its own WebAgent
    The agents are managed by LayoutManager
 */
public class LayoutAgent extends AbstractAgent {

    /**
        Value Lane to hold JSON object which describes the layout
     */
    @SwimLane("template")
    ValueLane<Value> template = this.<Value>valueLane();

    /**
        Command Lane to create/update layout data
     */
    @SwimLane("updateTemplate")
    public CommandLane<Value> updateLayout = this.<Value>commandLane()
        .onCommand((Value templateData) -> {
            template.set(templateData);
        });
     
}
