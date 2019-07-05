import React from "react";

import OptionsList from "../OptionsList/OptionsList";
import UserList from "../UserList/UserList";

import ChatboxArea from "../MainAreas/ChatboxArea/ChatboxArea";
import SearchArea from "../MainAreas/SearchArea/SearchArea";
import SettingsArea from "../MainAreas/SettingsArea/SettingsArea";

import "./MainView.css";

const MainView = props => {
  let mainComponent;
  switch (props.currentRoute) {
    case "messages":
      mainComponent = <ChatboxArea socketData={props.socketData}/>;
      break;
    case "search":
      mainComponent = <SearchArea />;
      break;
    case "settings":
      mainComponent = <SettingsArea />;
      break;
    default:
      break;
  }
  return (
    <div className="MainView">
      <OptionsList onLogout={props.onLogout} />
      <UserList socketUsers={props.socketUsers}/>
      {mainComponent}
    </div>
  );
};

export default MainView;
