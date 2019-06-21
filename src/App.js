import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import openSocket from "socket.io-client";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Navbar from "./components/Navbar/Navbar";
import Generator from "./components/Generator/Generator";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import AuthLogin from "./components/AuthLogin/AuthLogin";
import AuthRegister from "./components/AuthRegister/AuthRegister";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";
import Chatroom from "./components/Chatroom/Chatroom";
import Settings from "./components/Settings/Settings";

import "./App.css";

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    username: null,
    socketData: [],
    socketUsers: [],
    settings: false
  };
  componentDidMount() {
    const expiryDate = localStorage.getItem("expiryDate");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!expiryDate || !userData) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    const socket = openSocket("http://localhost:8080");
    this.setState({
      isAuth: true,
      token: userData.token,
      userId: userData.userId,
      username: userData.username
    });
    this.setAutoLogout(remainingMilliseconds);
    socket.on("messages", data => {
      if (data.action === "create") {
        this.setState({ socketData: data.post });
        console.log(data);
      }
      if (data.action === "join") {
        this.setState({ socketUsers: data.post });
        console.log(data);
      }
    });
  }

  setInnerAuth = (isAuth, token, userId, username) => {
    this.setState({ isAuth: isAuth, token: token, userId: userId, username });
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
      userId: null,
      username: null
    });
    localStorage.removeItem("userData");
    localStorage.removeItem("expiryDate");
    this.props.history.push("/");
  };

  setStateOnLogout = () => {
    this.setState({
      isAuth: false,
      token: null,
      userId: null,
      username: null
    });
    this.props.history.push("/");
  };

  settingsOn = () => {
    this.setState({ settings: true });
  };

  settingsOff = () => {
    this.setState({ settings: false });
  };

  render() {
    let routes = this.state.isAuth ? (
      <Route
        render={({ location }) => (
          <TransitionGroup className="CSST">
            <CSSTransition key={location.key} timeout={400} classNames="fade">
              <Switch location={location}>
                <Route
                  path="/chatroom/:id"
                  render={() => (
                    <Chatroom
                      socketUsers={this.state.socketUsers}
                      socketData={this.state.socketData}
                    />
                  )}
                />
                <Route path="/generator" render={() => <Generator />} />
                } />
                <Route path="/404" render={() => <ErrorScreen />} />
                <Route
                  path="/"
                  exact
                  render={() => <Redirect to="/generator" />}
                />
                <Route render={() => <Redirect to="/generator" />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    ) : (
      <Route
        render={({ location }) => (
          <TransitionGroup className="CSST">
            <CSSTransition key={location.key} timeout={400} classNames="fade">
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
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
    return (
      <div className="App">
        <Navbar
          settingsOn={this.settingsOn}
          isAuth={this.state.isAuth}
          setStateOnLogout={this.setStateOnLogout}
        />
        {this.state.isAuth ? (
          <Settings
            settingsOff={this.settingsOff}
            toggleSettings={this.toggleSettings}
            settingsOn={this.state.settings}
          />
        ) : null}
        <div className="App--Bottom">{routes}</div>
      </div>
    );
  }
}

export default withRouter(App);
