import React, { useState } from "react";
import openSocket from "socket.io-client";
import { withRouter } from "react-router-dom";
import Loader from "../../Loader/Loader";

import "./AuthLogin.css";

const AuthLogin = props => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const formHandler = e => {
    e.preventDefault();
    switch (e.target.name) {
      case "username":
        setFormData({
          ...formData,
          username: e.target.value
        });
        break;
      case "password":
        setFormData({
          ...formData,
          password: e.target.value
        });
        break;
      case "repeatPassword":
        setFormData({
          ...formData,
          repeatPassword: e.target.value
        });
        break;
      case "email":
        setFormData({
          ...formData,
          email: e.target.value
        });
        break;
      default:
        return;
    }
  };

  const onLogin = e => {
    e.preventDefault();
    setLoading(true);
    const graphqlQuery = {
      query: `{
        login(username: "${formData.username}", password: "${
        formData.password
      }"){
          token
          userId
          username
          avatar
        }
      }`
    };
    fetch("https://chatto--api.herokuapp.com/graphql", {
      method: "POST",
      mode: 'cors',
      credentials: 'same-origin',
      headers: { "Content-Type": "application/json", "Access-Control-Origin": "*" },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        setLoading(false);
        if (resData.errors && resData.errors[0].status === 401) {
          setValidationError(resData.errors[0].message);
        }
        if (!resData.errors) {
          const userData = {
            token: resData.data.login.token,
            username: resData.data.login.username,
            userId: resData.data.login.userId,
            avatar: `https://chatto--api.herokuapp.com/${resData.data.login.avatar}`
          };
          const socket = openSocket("https://chatto--api.herokuapp.com");
          socket.on("messages", data => {
            if (data.action === "create") {
              if (data.post.bearers[0] === userData.userId || data.post.bearers[1] === userData.userId) {
                props.setSocketData(data.post);
              }
              console.log(data);
            }
            if (data.action === "join") {
              if (data.post.bearers[0] === userData.userId || data.post.bearers[1] === userData.userId) {
                props.setSocketUsers(data.post);
              }
              console.log(data);
            }
          });
          localStorage.setItem("userData", JSON.stringify(userData));
          const remainingMilliseconds = 60 * 60 * 1000 * 24;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          props.setAuth(
            true,
            resData.data.login.token,
            resData.data.login.userId
          );
          props.history.push("/mainView/messages/:id");
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  const switchRoutes = e => {
    e.preventDefault();
    props.history.push("/auth-register");
  };
  const hideErrorMsg = () => {
    setValidationError("");
  };
  const errorStyle = validationError
    ? { opacity: 1, pointerEvents: "all" }
    : { opacity: 0, pointerEvents: "none" };
  return (
    <div className="Auth">
      <div className="Auth__Container">
        <div className="Container--Top">
          <div className="Container__Logo" />
        </div>
        <div className="Container--Mid">
          <form className="Auth__Form" onSubmit={e => onLogin(e)}>
            <div className="Auth__Container__Heading">
              <div className="Heading--SVG" />
              <div className="Heading--Text">
                <h2>Login</h2>
              </div>
            </div>
            <input
              name="username"
              onChange={formHandler}
              onFocus={hideErrorMsg}
              type="text"
              placeholder="Username"
            />
            <input
              name="password"
              onChange={formHandler}
              onFocus={hideErrorMsg}
              type="password"
              placeholder="Password"
            />
            <input type="submit" value="Login" />
            {loading ? (
              <div className="Form__Loading">
                <Loader />
              </div>
            ) : (
              <div className="Form__Error" style={errorStyle}>
                <p>
                  <span />
                  {validationError}
                </p>
              </div>
            )}
          </form>
        </div>
        <div className="Container--Bottom">
          <p>
            <a href="/#" onClick={e => switchRoutes(e)}>
              Register
            </a>{" "}
            for a new account
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AuthLogin);
