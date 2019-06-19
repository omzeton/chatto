import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "./AuthRegister.css";

const AuthRegister = props => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const [validationError, setValidationError] = useState("");

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
  const switchRoutes = e => {
    e.preventDefault();
    props.history.push("/auth-login");
  };

  const onRegister = e => {
    e.preventDefault();
    const graphqlQuery = {
      query: `
      mutation {
        createUser(userInput: {username: "${formData.username}", email: "${
        formData.email
      }", password:"${formData.password}", repeatPassword:"${
        formData.repeatPassword
      }"}) {
          _id
          email
        }
      }
      `
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
        if (resData.errors && resData.errors[0].status === 422) {
          setValidationError(resData.errors[0].data[0].message);
        }
        if (resData.errors && resData.errors[0].status === 500) {
          setValidationError(resData.errors[0].data[0].message);
        }
        if (!resData.errors) {
          props.history.push("/auth-login");
        }
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const hideErrorMsg = () => {
    setValidationError("");
  };

  const errorStyle = validationError
    ? { opacity: 1, pointerEvents: "all" }
    : { opacity: 0, pointerEvents: "none" };

  return (
    <div className="Auth">
      <div className={["Auth__Container", "Auth__Container__Reg"].join(" ")}>
        <div className="Container--Top">
          <div className="Container__Logo" />
        </div>
        <div className={"Container--Mid"}>
          <form
            className={["Auth__Form", "Mid__Register"].join(" ")}
            onSubmit={e => onRegister(e)}
          >
            <div className="Auth__Container__Heading">
              <div className="Heading--SVG" />
              <div className="Heading--Text">
                <h2>Register</h2>
              </div>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onFocus={hideErrorMsg}
              onChange={formHandler}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onFocus={hideErrorMsg}
              onChange={formHandler}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onFocus={hideErrorMsg}
              onChange={formHandler}
            />
            <input
              type="password"
              name="repeatPassword"
              placeholder="Repeat password"
              onFocus={hideErrorMsg}
              onChange={formHandler}
            />
            <input type="submit" value="Register" />
            <div className="Form__Error" style={errorStyle}>
              <p>
                <span />
                {validationError}
              </p>
            </div>
          </form>
        </div>
        <div className="Container--Bottom">
          <p>
            <a href="/#" onClick={e => switchRoutes(e)}>
              Login
            </a>{" "}
            to your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AuthRegister);
