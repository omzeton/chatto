import React, { useState, useEffect } from "react";

import ChatWindow from "./ChatWindow/ChatWindow";
import ChatInput from "./ChatInput/ChatInput";

import "./ChatboxArea.css";

const ChatboxArea = props => {
  const [conversation, setConversation] = useState({ messages: [], users: [] });

  useEffect(() => {
    setConversation({
      messages: props.socketData.messages,
      users: [...conversation.users]
    });
    // eslint-disable-next-line
  }, [props.socketData]);

  const loadMessages = e => {
    const graphqlQuery = {
      query: `{
        fetchConversation(conversationId: "${props.convId}") {
          messages {
            uId
            body
            date
            avatar
            attachment
          }
          users {
            uId
            username
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
        setConversation({
          messages: resData.data.fetchConversation.messages,
          users: resData.data.fetchConversation.users
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loadNewMsg = newData => {
    setConversation({ messages: newData, users: [...conversation.users] });
  };
  return (
    <div className="ChatboxArea">
      <ChatWindow isAuth={props.isAuth} loadMessages={loadMessages} conv={conversation} />
      <ChatInput loadNewMsg={loadNewMsg} />
    </div>
  );
};

export default ChatboxArea;
