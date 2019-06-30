import React, { useEffect, useState } from "react";

import Usermini from "./Usermini/Usermini";

import "./UserList.css";

const UserList = props => {
  const [users, setUsers] = useState();

  useEffect(() => {
    setUsers({
      users: props.socketUsers.users
    });
    console.log(props.socketUsers);
    // eslint-disable-next-line
  }, [props.socketUsers]);

  useEffect(() => {
    console.log(props.convId);
    const graphqlQuery = {
      query: `{
        fetchConversation(conversationId: "${props.convId}") {
          messages {
            uId
            body
            date
          }
          users {
            uId
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
        setUsers({
          users: resData.data.fetchConversation.users
        });
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  let userList = [];

  if (users) {
    for (let i = 0; i < users.users.length; i++) {
      userList.push(
        <Usermini avatar={users.users[i].avatar} key={users.users[i].uId} name={users.users[i].username} />
      );
    }
  }

  return (
    <div className="UserList">
      <div className="UserList--Header">
        <h2>Online</h2>
      </div>
      <div className="UserList--Main">{userList}</div>
    </div>
  );
};

export default UserList;
