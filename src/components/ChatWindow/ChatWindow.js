import React from "react";

import Msg from "../Message/Message";

import "./ChatWindow.css";

const ChatWindow = props => {
  return (
    <div className="ChatWindow">
      <div className="Chat__Container">
        <Msg method="pin" sender="self" bgImg="http://localhost:3000/assets/02.jpg"/>
        <Msg method="msg" sender="self" body="Hi!" />
        <Msg method="msg" sender="self" body="How are you?" />
        <Msg method="msg" sender="self" body="I'm Mysio!" />

        <Msg method="pin" sender="other" bgImg="http://localhost:3000/assets/01.jpg"/>
        <Msg method="msg" sender="other" body="Hi!" />
        <Msg method="msg" sender="other" body="I know why you're here" />
      </div>
    </div>
  );
};

export default ChatWindow;
