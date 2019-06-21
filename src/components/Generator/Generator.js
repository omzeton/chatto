import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Loader from "../Loader/Loader";

import "./Generator.css";

const Generator = props => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkList, setLinkList] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphQlQuery = {
      query: `
      {
        getPreviousConversations(userId: "${userData.userId}") {
          conversations {
            url
            date
          }
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
        setLinkList(resData.data.getPreviousConversations.conversations);
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let minutes = today.getMinutes();
    let hours = today.getHours();
    let yyyy = today.getFullYear();
    let date;

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    date = yyyy + "/" + mm + "/" + dd + " " + hours + ":" + minutes;

    return date;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));

  const generateLink = e => {
    setLoading(true);
    const graphQlQuery = {
      query: `
      {
        createLink(userId: "${userData.userId}"){
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
        setLinkList([
          ...linkList,
          {
            url: resData.data.createLink.chatroomLink,
            date: getCurrentDate()
          }
        ]);
        console.log(linkList);
        console.log(resData);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  const connect = e => {
    setLoading(true);
    const graphQlQuery = {
      query: `{
        connectToConversation(chatroomLink: "${link}", userId: "${
        userData.userId
      }") {
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

  const loadingStyle = loading ? { opacity: 1 } : { opacity: 0 };

  const links = [];

  for (let l of linkList) {
    links.push(
      <div
        className="Generated"
        key={l.url}
        onClick={() => props.history.push(`/chatroom/${l.url}`)}
      >
        <div className="Generated--Left">
          <p>{l.date}</p>
        </div>
        <div className="Generated--Right">
          <h2>{l.url}</h2>
        </div>
      </div>
    );
  }

  let avatarbg = userData ? userData.avatar : "",
    username = userData ? userData.username : "";

  return (
    <div className="Generator">
      <div className="Generator__Container">
        <div
          className="Container__Top__Avatar"
          style={{ backgroundImage: `url(${avatarbg})` }}
        />
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
      <div className="Generator__Rooms">
        <div className="Generator__Rooms__Header">
          <h2>Previously generated</h2>
        </div>
        <div className="Generator__Links">{links}</div>
      </div>
    </div>
  );
};

export default withRouter(Generator);
