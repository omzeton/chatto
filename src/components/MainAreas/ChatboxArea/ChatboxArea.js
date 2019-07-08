import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import ChatWindow from "./ChatWindow/ChatWindow";
import ChatInput from "./ChatInput/ChatInput";

import "./ChatboxArea.css";

const ChatboxArea = props => {
  const [conversation, setConversation] = useState({ messages: [], users: [] });

  useEffect(() => {
    const currentPartnerId = props.match.params.id;
    if (props.socketData.bearers) {
      if (
        props.socketData.bearers[0] !== currentPartnerId &&
        props.socketData.bearers[1] !== currentPartnerId
      ) {
        console.log("Socket updated but not shown - different user ids.");
      } else {
        setConversation({
          messages: props.socketData.messages,
          users: [...conversation.users]
        });
      }
    }

    // eslint-disable-next-line
  }, [props.socketData]);

  const loadMessages = e => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphqlQuery = {
      query: `{
        connectToStream(otherId: "${props.match.params.id}", ownId: "${
        userData.userId
      }") {
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
        console.log(resData);
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

  return (
    <div className="ChatboxArea">
      <ChatWindow
        isAuth={props.isAuth}
        loadMessages={loadMessages}
        conv={conversation}
      />
      <ChatInput loadNewMsg={loadNewMsg} />
    </div>
  );
};

export default withRouter(ChatboxArea);
