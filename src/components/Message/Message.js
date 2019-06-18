import React from "react";

import "./Message.css";

const Message = props => {
  const colors =
    props.sender === "self"
      ? ["Message", "Self"].join(" ")
      : ["Message", "Other"].join(" ");
  return (
    <>
      <div className={colors}>
        <h2>{props.body}</h2>
      </div>
      <div className="Clear" />
    </>
  );
};

export default Message;
