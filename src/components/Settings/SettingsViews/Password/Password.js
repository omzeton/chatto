import React, { useState } from "react";

import "./Password.css";

const Password = props => {
  const [fetchingError, setFetchingError] = useState("");
  const [formData, setFormData] = useState({
    old: "",
    new: "",
    repeat: ""
  });

  const onInput = e => {
    switch (e.target.name) {
      case "old":
        setFormData({
          ...formData,
          old: e.target.value
        });
        break;
      case "new":
        setFormData({
          ...formData,
          new: e.target.value
        });
        break;
      case "repeat":
        setFormData({
          ...formData,
          repeat: e.target.value
        });
        break;
      default:
        break;
    }
  };

  const onChangePassword = e => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const graphQLQuery = {
      query: `mutation {
            changePassword(oldPassword: "${formData.old}", newPassword: "${
        formData.new
      }", repeatPassword: "${formData.repeat}", userId:"${userData.userId}") {
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
        setFetchingError(resData.data.changePassword.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const hideError = () => {
    setFetchingError("");
  };

  return (
    <div className="Password">
      <div className="Header">
        <h2>Change password</h2>
      </div>
      <form className="Password__Form" onSubmit={e => onChangePassword(e)}>
        <h2>Old password:</h2>
        <input
          type="password"
          name="old"
          onChange={onInput}
          onFocus={hideError}
        />
        <h2>New password:</h2>
        <input
          type="password"
          name="new"
          onChange={onInput}
          onFocus={hideError}
        />
        <h2>Repeat new password:</h2>
        <input
          type="password"
          name="repeat"
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

export default Password;
