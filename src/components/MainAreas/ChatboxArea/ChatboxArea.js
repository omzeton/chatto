import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import ChatWindow from "./ChatWindow/ChatWindow";
import ChatInput from "./ChatInput/ChatInput";

import "./ChatboxArea.css";

const ChatboxArea = props => {
  const [conversation, setConversation] = useState({ messages: [], users: [] });
  const [chatboxWindow, setChatboxWindow] = useState();

  useEffect(() => {
    setConversation({
      messages: props.socketData.messages,
      users: [...conversation.users]
    });
    if (chatboxWindow) {
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [props.socketData]);

  const loadMessages = e => {
    console.log("test");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphqlQuery = {
      query: `{
        connectToStream(otherId: "${props.match.params.id}", ownId: "${userData.userId}") {
          messages {
            uId
            body
            date
            avatar
            attachment
          }
          users {
            _id
            username
            avatar
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
          messages: resData.data.connectToStream.messages,
          users: resData.data.connectToStream.users
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loadNewMsg = newData => {
    setConversation({ messages: newData, users: [...conversation.users] });
  };

  const scrollToBottom = () => chatboxWindow.scrollTo(0, chatboxWindow.scrollHeight);

  return (
    <div className="ChatboxArea">
      <ChatWindow setRef={setChatboxWindow} isAuth={props.isAuth} loadMessages={loadMessages} conv={conversation} />
      <ChatInput loadNewMsg={loadNewMsg} />
    </div>
  );
};

export default withRouter(ChatboxArea);
