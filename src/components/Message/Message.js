import React from "react";

import "./Message.css";

const Message = props => {
  const method = props.method === "pin" ? "Message__Pin" : "";
  const colors =
    props.sender === "self"
      ? ["Message", "Self", method].join(" ")
      : ["Message", "Other", method].join(" ");
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
