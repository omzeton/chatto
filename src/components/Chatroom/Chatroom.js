import React from "react";
import UserList from "../UserList/UserList";
import ChatboxArea from "../ChatboxArea/ChatboxArea";

import './Chatroom.css';

const Chatroom = props => {
  return (
    <div className="Chatroom">
      <ChatboxArea socketData={props.socketData} />
      <UserList />
    </div>
  );
};

export default Chatroom;
