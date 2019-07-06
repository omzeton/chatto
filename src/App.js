import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import openSocket from "socket.io-client";

import Navbar from "./components/Navbar/Navbar";
import MainView from "./components/MainView/MainView";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import AuthLogin from "./components/Auth/AuthLogin/AuthLogin";
import AuthRegister from "./components/Auth/AuthRegister/AuthRegister";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";

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

  setSocketData = data => this.setState({ socketData: data });
  setSocketUsers = posts => this.setState({ socketUsers: posts });

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
          <Switch location={location}>
            <Route
              path="/mainView/messages/:id"
              render={() => (
                <MainView
                  onLogout={this.logoutHandler}
                  currentRoute="messages"
                  socketUsers={this.state.socketUsers}
                  isAuth={this.state.isAuth}
                  socketData={this.state.socketData}
                />
              )}
            />
            <Route
              path="/mainView/search"
              render={() => (
                <MainView
                  onLogout={this.logoutHandler}
                  currentRoute="search"
                  socketUsers={this.state.socketUsers}
                  isAuth={this.state.isAuth}
                  socketData={this.state.socketData}
                />
              )}
            />
            <Route
              path="/mainView/user"
              render={() => (
                <MainView
                  onLogout={this.logoutHandler}
                  currentRoute="user"
                  socketUsers={this.state.socketUsers}
                  isAuth={this.state.isAuth}
                  socketData={this.state.socketData}
                />
              )}
            />
            <Route
              path="/mainView/settings"
              render={() => (
                <MainView
                  onLogout={this.logoutHandler}
                  currentRoute="settings"
                  socketUsers={this.state.socketUsers}
                  isAuth={this.state.isAuth}
                  socketData={this.state.socketData}
                />
              )}
            />
            <Route path="/404" render={() => <ErrorScreen />} />
            <Route
              path="/"
              exact
              render={() => <Redirect to="/mainView/messages/:id" />}
            />
          </Switch>
        )}
      />
    ) : (
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route path="/" exact render={() => <HomeScreen />} />
            <Route
              path="/auth-login"
              exact
              render={() => (
                <AuthLogin
                  setSocketUsers={this.setSocketUsers}
                  setSocketData={this.setSocketData}
                  setAuth={this.setInnerAuth}
                />
              )}
            />
            <Route
              path="/auth-register"
              exact
              render={() => <AuthRegister />}
            />
            <Route path="/404" exact render={() => <ErrorScreen />} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        )}
      />
    );
    return (
      <div className="App">
        {this.state.isAuth ? null : (
          <Navbar
            settingsOn={this.settingsOn}
            isAuth={this.state.isAuth}
            setStateOnLogout={this.setStateOnLogout}
          />
        )}
        <div className="App--Bottom">{routes}</div>
      </div>
    );
  }
}

export default withRouter(App);
