import React from "react";
import { withRouter } from "react-router-dom";

import UserList from "../UserList/UserList";
import ChatboxArea from "../ChatboxArea/ChatboxArea";

import './Chatroom.css';

const Chatroom = props => {
  const convId = props.match.params.id;
  return (
    <div className="Chatroom">
      <ChatboxArea convId={convId} socketData={props.socketData} />
      <UserList socketUsers={props.socketUsers} convId={convId}/>
    </div>
  );
};

export default withRouter(Chatroom);
