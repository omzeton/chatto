import React, { useState } from "react";

import "./Account.css";

const Account = props => {
  const [fetchingError, setFetchingError] = useState("");
  const [formData, setFormData] = useState({
    confirm: ""
  });

  const onChangeUsername = e => {
    e.preventDefault();

    if (formData.confirm !== "I'm sure") {
      setFetchingError("To confirm account deletion please type I'm sure");
    } else {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const graphQLQuery = {
        query: `mutation {
            deleteAccount(userId: "${userData.userId}") {
                status
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
          if (resData.data.deleteAccount.status === 204) {
            props.onLogout();
          } else {
            setFetchingError("Network error.");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const onInput = e => {
    setFormData({
      confirm: e.target.value
    });
  };
  const hideError = () => {
    setFetchingError("");
  };
  return (
    <div className="Password">
      <div className="Header">
        <p>
          Are you sure you wish to delete your account?
          <br />
          After termination there's no going back. All your messages and links
          will be lost for you, but they will still be visible for users with
          whom you connected in the past.
          <br />
          To confirm simply type "<span>I'm sure</span>" into the input below
          and hit confirm button.
        </p>
      </div>
      <form className="Password__Form" onSubmit={e => onChangeUsername(e)}>
        <input
          type="text"
          name="confirm"
          placeholder="I'm sure"
          onChange={onInput}
          onFocus={hideError}
        />
        <button type="submit">Confirm</button>
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

export default Account;
