import React, { useState, useEffect } from "react";

import './Username.css';

const Username = props => {
  const [fetchingError, setFetchingError] = useState("");
  const [formData, setFormData] = useState({
    username: ""
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setFormData({username: userData.username});
  }, []);
  const onChangeUsername = e => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphQLQuery = {
      query: `mutation {
        changeUsername(username: "${formData.username}", userId: "${userData.userId}") {
                message
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
        console.log(resData);
        
        setFetchingError(resData.data.changeUsername.message);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onInput = e => {
    setFormData({
      username: e.target.value
    });
  };
  const hideError = () => {
    setFetchingError("");
  };
  return (
    <div className="Password">
      <div className="Header">
        <h2>Change your username</h2>
      </div>
      <form className="Password__Form" onSubmit={e => onChangeUsername(e)}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onInput}
          onFocus={hideError}
        />
        <button type="submit">Submit changes</button>
      </form>
      <div
        className="Popup"
        style={fetchingError === "" ? { opacity: 0 } : { opacity: 1 }}
      >
        <p>{fetchingError}</p>
      </div>
    </div>
  );
};

export default Username;
