import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import openSocket from "socket.io-client";

import Navbar from "./components/Navbar/Navbar";
import UserList from "./components/UserList/UserList";
import ChatboxArea from "./components/ChatboxArea/ChatboxArea";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import AuthLogin from "./components/AuthLogin/AuthLogin";
import AuthRegister from "./components/AuthRegister/AuthRegister";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";

import "./App.css";

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    socket: null
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    const socket = openSocket("http://localhost:8080");
    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
      socket: socket
    });
    this.setAutoLogout(remainingMilliseconds);
  }

  setInnerAuth = (isAuth, token, userId) => {
    this.setState({ isAuth: isAuth, token: token, userId: userId });
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  logoutHandler = () => {
    this.setState({
      isAuth: false,
      token: null,
      userId: null
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    this.props.history.push("/");
  };

  setStateOnLogout = () => {
    this.setState({
      isAuth: false,
      token: null,
      userId: null
    });
    this.props.history.push("/");
  };

  render() {
    let routes = this.state.isAuth ? (
      <div className="App--Bottom">
        <ChatboxArea socket={this.state.socket} />
        <UserList />
      </div>
    ) : (
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route path="/" exact render={() => <HomeScreen />} />
            <Route
              path="/auth-login"
              exact
              render={() => <AuthLogin setAuth={this.setInnerAuth} />}
            />
            <Route
              path="/auth-register"
              exact
              render={() => <AuthRegister />}
            />
            <Route path="/404" exact render={() => <ErrorScreen />} />
            <Route render={() => <Redirect to="/404" />} />
          </Switch>
        )}
      />
    );
    return (
      <div className="App">
        <Navbar
          isAuth={this.state.isAuth}
          setStateOnLogout={this.setStateOnLogout}
        />
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
