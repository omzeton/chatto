import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Loader from "../Loader/Loader";

import "./Generator.css";

const Generator = props => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const generateLink = e => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    const graphQlQuery = {
      query: `
      {
        createLink(userId: "${userId}"){
          chatroomLink
        }
      }
      `
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setLoading(false);
        setLink(resData.data.createLink.chatroomLink);
        console.log(resData);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  const connect = e => {
    const userId = localStorage.getItem("userId");
    console.log(link);
    setLoading(true);
    const graphQlQuery = {
      query: `{
        connectToConversation(chatroomLink: "${link}", userId: "${userId}") {
          chatroomUrl
        }
      }`
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setLoading(false);
        console.log(resData);
        props.history.push(
          `/chatroom/${resData.data.connectToConversation.chatroomUrl}`
        );
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  const onLinkChange = e => {
    setLink(e.target.value);
  };
  const username = localStorage.getItem("username");
  const loadingStyle = loading ? { opacity: 1 } : { opacity: 0 };
  return (
    <div className="Generator">
      <div className="Generator__Container">
        <div className="Container__Top__Avatar" />
        <div className="Container__Top__Heading">
          <h2>
            Welcome back <span>{username}</span>!
          </h2>
          <p>
            To connect with your friends simply paste your secret link below and
            hit <span>"Connect with room"</span>. If you wish to start a new
            conversation click <span>"Generate new link"</span> and then
            connect. Don't forget to save the link somehwere, so you can share
            it with other later on!
          </p>
        </div>
        <div className="Container__Mid">
          <div className="Mid__Btn">
            <button onClick={e => generateLink(e)}>Generate new link</button>
          </div>
          <div className="Mid__Btn">
            <button onClick={e => connect(e)}>Connect with room</button>
          </div>
        </div>
        <div className="Container__Btm">
          <input
            type="text"
            placeholder="Chatroom link"
            value={link}
            onChange={e => onLinkChange(e)}
          />
        </div>
        <div className="Generator__Loading" style={loadingStyle}>
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Generator);
