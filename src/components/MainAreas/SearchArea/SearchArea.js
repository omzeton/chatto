import React, { useEffect, useState } from "react";

import "./SearchArea.css";

const SearchArea = props => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphQLQuery = {
      query: `
      {
        fetchAllUsers(userId: "${userData.userId}") {
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
      body: JSON.stringify(graphQLQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setUsers(resData.data.fetchAllUsers.users);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));
  let userQuery = [];

  for (let u of users) {
    if (searchQuery !== "") {
      if (u.username.split(searchQuery)[0] === "" && userData.userId !== u._id) {
        userQuery.push(
          <div className="Usercard" key={u._id}>
            <div className="Usercard__Left">
              <div
                className="Usercard__Left__Avatar"
                style={{
                  backgroundImage: `url(http://localhost:8080/${u.avatar})`
                }}
              />
            </div>
            <div className="Usercard__Right">
              <p>{u.username}</p>
            </div>
          </div>
        );
      }
    } else {
      if (userData.userId !== u._id) {
        userQuery.push(
          <div className="Usercard" key={u._id}>
            <div className="Usercard__Left">
              <div
                className="Usercard__Left__Avatar"
                style={{
                  backgroundImage: `url(http://localhost:8080/${u.avatar})`
                }}
              />
            </div>
            <div className="Usercard__Right">
              <p>{u.username}</p>
            </div>
          </div>
        );
      }
    }
  }
  return (
    <div className="SearchArea">
      <div className="Searchbar__Container">
        <input
          type="text"
          placeholder="Search for users"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="SearchArea__User__Container">{userQuery}</div>
    </div>
  );
};

export default SearchArea;
