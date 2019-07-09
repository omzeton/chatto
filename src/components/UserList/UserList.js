import React, { useState, useEffect } from "react";

import Usermini from "./Usermini/Usermini";

import "./UserList.css";

const UserList = props => {
  const [contacts, setContact] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphqlQuery = {
      query: `{
        fetchContactList(userId: "${userData.userId}") {
          contacts {
            uId
            username
            avatar
            _id
          }
        }
      }`
    };
    fetch("https://chatto--api.herokuapp.com/graphql", {
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
  }, [props.socketUsers]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphqlQuery = {
      query: `{
        fetchContactList(userId: "${userData.userId}") {
          contacts {
            uId
            username
            avatar
            _id
          }
        }
      }`
    };
    fetch("https://chatto--api.herokuapp.com/graphql", {
      method: "POST",
      mode: 'cors',
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
      if (searchQuery !== "") {
        if (
          c.username.split(searchQuery)[0] === "" &&
          userData.userId !== c._id
        ) {
          userList.push(
            <Usermini
              url={c.uId}
              key={c._id}
              avatar={c.avatar}
              username={c.username}
            />
          );
        }
      } else {
        if (c.uId !== userData.userId) {
          userList.push(
            <Usermini
              url={c.uId}
              key={c._id}
              avatar={c.avatar}
              username={c.username}
            />
          );
        }
      }
    }
  }

  return (
    <div className="UserList">
      <div className="UserList__Search__Container">
        <span className="Search__Icon" />
        <input
          placeholder="Search contacts"
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      <div className="UserList--Main">
        {userList.length === 0 ? <h2>No users found</h2> : userList}
      </div>
    </div>
  );
};

export default UserList;
