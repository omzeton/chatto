import React, { useState } from "react";

import "./ChatInput.css";

const ChatInput = props => {
  const [msg, setMsg] = useState({ body: "" });

  const onChange = e => {
    e.preventDefault();
    setMsg({ body: e.target.value });
  };
  const sendMessage = e => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const graphqlQuery = {
      query: `
      mutation {
        createMessage(messageInput:{conversationId: "5d0a787817c18e39c4a7aebc", userId: "${userId}", body: "${
          msg.body
        }"}) {
          messages {
            uId
            body
            date
          }
        }
      }`
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        props.loadNewMsg(resData.data.createMessage.messages);
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
          onChange={e => onChange(e)}
        />
        <input type="submit" value="" className="ChatInput__Form__Send" />
      </form>
    </div>
  );
};

export default ChatInput;
