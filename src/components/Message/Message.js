import React from "react";

import "./Message.css";

const Message = props => {
  const method = props.method === "pin" ? "Message__Pin" : "";
  const date = props.method === "date" ? "Message__Timestamp" : method;
  const colors =
    props.sender === "self"
      ? [date, "Message", "Self", date].join(" ")
      : [date, "Message", "Other"].join(" ");
  return (
    <>
      <div
        className={colors}
        style={
          props.method === "pin"
            ? { backgroundImage: `url(${props.bgImg})` }
            : {}
        }
      >
        <h2>{props.body}</h2>
      </div>
      <div className="Clear" />
    </>
  );
};

export default Message;
