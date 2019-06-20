import React, { useEffect } from "react";

import Msg from "../Message/Message";

import "./ChatWindow.css";

const ChatWindow = props => {
  useEffect(() => {
    props.loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let feed = [],
    con = props.conv;

  console.log(con);

  if (con.users.length > 0) {
    const userId = localStorage.getItem("userId");
    for (let i = 0; i < con.messages.length; i++) {
      let innerMessages = [],
        label = con.messages[i].uId === userId ? "self" : "other",
        bgImg =
          con.messages[i].uId === "5d0a796fd1e4981224d1ee8a"
            ? "http://localhost:3000/assets/02.jpg"
            : "http://localhost:3000/assets/04.jpg",
        msgStream = (
          <div className={label} key={i + 20}>
            {innerMessages}
          </div>
        ),
        prevMsgId =
          i - 1 === -1 ? con.messages[0].uId : con.messages[i - 1].uId;

      innerMessages.push(
        <Msg method="msg" key={i} sender={label} body={con.messages[i].body} />
      );
      if (i === 0) {
        innerMessages.unshift(
          <Msg method="pin" key={i + 10} sender={label} bgImg={bgImg} />
        );
        innerMessages.push(
          <Msg
            method="date"
            key={i + 30}
            sender={label}
            body={con.messages[i].date}
          />
        );
        innerMessages = [];
      }
      if (con.messages[i].uId !== prevMsgId) {
        innerMessages.unshift(
          <Msg method="pin" key={i + 10} sender={label} bgImg={bgImg} />
        );
        innerMessages.push(
          <Msg
            method="date"
            key={i + 30}
            sender={label}
            body={con.messages[i].date}
          />
        );
        innerMessages = [];
      }
      feed.push(msgStream);
    }
  }

  return (
    <div className="ChatWindow">
      <div className="Chat__Container">
        {feed}
      </div>
    </div>
  );
};

export default ChatWindow;
