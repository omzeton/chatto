import React from "react";

import Msg from "../Message/Message";

import "./ChatWindow.css";

const ChatWindow = props => {
  return (
    <div className="ChatWindow">
      <div className="Chat__Container">
        <Msg sender="self" body="Hi!" />
        <Msg sender="self" body="How are you?" />
        <Msg sender="self" body="I'm Adam!" />
        <Msg sender="other" body="Hi" />
        <Msg sender="other" body="I know why you're here" />
        <Msg sender="self" body="..." />
        <Msg sender="self" body="Hi!" />
        <Msg sender="self" body="How are you?" />
        <Msg sender="self" body="I'm Adam!" />
        <Msg sender="other" body="Hi" />
        <Msg sender="other" body="I know why you're here" />
        <Msg sender="self" body="..." />
        <Msg sender="self" body="Hi!" />
        <Msg sender="self" body="How are you?" />
        <Msg sender="self" body="I'm Adam!" />
        <Msg sender="other" body="Hi" />
        <Msg sender="other" body="I know why you're here" />
        <Msg sender="self" body="..." />
        <Msg sender="self" body="Hi!" />
        <Msg sender="self" body="How are you ? How are you ? How are you ? How are you ? How are you ?How are you ?How are you ? How are you ? How are you ? How are you ? How are you ? How are you ?" />
        <Msg sender="self" body="I'm Adam!" />
        <Msg sender="other" body="Hi" />
        <Msg sender="other" body="I know why you're here" />
        <Msg sender="self" body="..." />
      </div>
    </div>
  );
};

export default ChatWindow;
