import React from "react";
import {Tab} from "semantic-ui-react";
import AllFundingTab from "./allFundingTab/AllFundingTab";
import CreatorFundingTab from "./creatorFundingTab/CreatorFundingTab";
import SupporterFundingTab from "./supporterFundingTab/SupporterFundingTab";

const panes = [
    {menuItem: '所有的', render: () => <Tab.Pane><AllFundingTab/></Tab.Pane>},
    {menuItem: '我发起的', render: () => <Tab.Pane><CreatorFundingTab/></Tab.Pane>},
    {menuItem: '我参与的', render: () => <Tab.Pane><SupporterFundingTab/></Tab.Pane>},
]

const TabCenter=()=><Tab panes={panes}></Tab>
export default TabCenter