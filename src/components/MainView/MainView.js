import React, { useState } from "react";

import OptionsList from '../OptionsList/OptionsList';
import UserList from "../UserList/UserList";
import ChatboxArea from "../ChatboxArea/ChatboxArea";

import "./MainView.css";

const MainView = props => {
  const [view, setView] = useState("messages");
  const changeView = view => setView(view);
  return (
    <div className="MainView">
      <OptionsList onChangeView={changeView} currentView={view}/>
      <UserList currentView={view}/>
      <ChatboxArea currentView={view}/>
    </div>
  );
};

export default MainView;
