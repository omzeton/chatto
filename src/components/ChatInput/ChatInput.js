import React from "react";

import "./ChatInput.css";

const ChatInput = props => {
  const sendMessage = e => {
    e.preventDefault();
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "{ hello }"
      })
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="ChatInput">
      <div className="ChatInput__Emoji" />
      <form onSubmit={e => sendMessage(e)} className="ChatInput__Form">
        <textarea
          placeholder="type something..."
          className="ChatInput__Form__Input"
        />
        <input type="submit" value="" className="ChatInput__Form__Send" />
      </form>
    </div>
  );
};

export default ChatInput;
