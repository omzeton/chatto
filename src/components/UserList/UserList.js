import React, { useState, useEffect } from "react";

import Usermini from "./Usermini/Usermini";

import "./UserList.css";

const UserList = props => {
  const [contacts, setContact] = useState([]);
  useEffect(() => {
    if (props.socketUsers) {
      setContact(props.socketUsers.users);
    }
  }, [props.socketUsers]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphqlQuery = {
      query: `{
        fetchContactList(userId: "${userData.userId}") {
          contacts {
            username
            avatar
            _id
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
        setContact(resData.data.fetchContactList.contacts);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const userList = [];
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (contacts) {
    for (let c of contacts) {
      if (c.uId !== userData.userId) {
        userList.push(
          <Usermini url={c.uId} key={c._id} avatar={c.avatar} username={c.username} />
        );
      }
    }
  }

  return (
    <div className="UserList">
      <div className="UserList__Search__Container">
        <span className="Search__Icon" />
        <input placeholder="Search contacts" />
      </div>
      <div className="UserList--Main">{userList}</div>
    </div>
  );
};

export default UserList;
