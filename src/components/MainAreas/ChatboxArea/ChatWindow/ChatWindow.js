import React, { useEffect } from "react";

import Msg from "./Message/Message";

import "./ChatWindow.css";

const ChatWindow = props => {
  useEffect(() => {
    props.loadMessages();
    // eslint-disable-next-line
  }, []);
  const userData = JSON.parse(localStorage.getItem("userData"));

  let feed = [],
    con = props.conv;

  if (userData) {
    if (con.users.length > 0) {
      for (let i = 0; i < con.messages.length; i++) {

        let innerMessages = [],
          label = con.messages[i].uId === userData.userId ? "self" : "other",
          bgImg = `http://localhost:8080/${con.messages[i].avatar}`,
          attachment = con.messages[i].attachment === "null" ? false : `http://localhost:8080/${con.messages[i].attachment}`,
          msgStream = <div className={label} key={i + 20}>{innerMessages}</div>,
          prevMsgId = i - 1 === -1 ? con.messages[0].uId : con.messages[i - 1].uId,
          nextMsgId = con.messages[i+1] === undefined ? con.messages[i].uId : con.messages[i+1].uId;

        // No matter what push a message to the stream
        innerMessages.push(
          <Msg
            attachment={attachment}
            method="msg"
            key={i}
            sender={label}
            body={con.messages[i].body}
          />
        );

        // If is a singular message add both pin and date
        if (
          (con.messages[i].uId !== prevMsgId &&
            con.messages[i].uId !== nextMsgId) ||
          con.messages.length === 1
        ) {
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
        } else {
          // Else if more messages by user
          // If first message ever make add a pin before it
          if (i === 0) {
            innerMessages.unshift(
              <Msg method="pin" key={i + 10} sender={label} bgImg={bgImg} />
            );
            innerMessages = [];
          }
          // If previous message belong to other user add pin at the top
          if (con.messages[i].uId !== prevMsgId) {
            innerMessages.unshift(
              <Msg method="pin" key={i + 10} sender={label} bgImg={bgImg} />
            );
            innerMessages = [];
          }
          // If next message belongs to different user add date
          if (con.messages[i].uId !== nextMsgId) {
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
        }
        feed.push(msgStream);
      }
    }
  }

  return (
    <div className="ChatWindow">
      <div className="Chat__Container" ref={ref => props.setRef(ref)}>
        {feed}
      </div>
    </div>
  );
};

export default ChatWindow;
