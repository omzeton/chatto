import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import openSocket from "socket.io-client";

import Navbar from "./components/Navbar/Navbar";
import UserList from "./components/UserList/UserList";
import ChatboxArea from "./components/ChatboxArea/ChatboxArea";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Auth from "./components/Auth/Auth";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";

import "./App.css";

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null
  };
  componentDidMount() {
    // const token = localStorage.getItem("token");
    // const expiryDate = localStorage.getItem("expiryDate");
    // if (!token || !expiryDate) {
    //   return;
    // }
    // if (new Date(expiryDate) <= new Date()) {
    //   this.logoutHandler();
    //   return;
    // }
    // const userId = localStorage.getItem("userId");
    // const remainingMilliseconds =
    //   new Date(expiryDate).getTime() - new Date().getTime();
    // this.setState({
    //   isAuth: true,
    //   token: token,
    //   userId: userId
    // });
    // this.setAutoLogout(remainingMilliseconds);
    // openSocket("http://localhost:3000");
  }
  render() {
    let routes = this.state.isAuth ? (
      <div className="App--Bottom">
        <ChatboxArea />
        <UserList />
      </div>
    ) : (
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route path="/" exact render={() => <HomeScreen />} />
            <Route path="/auth" exact render={() => <Auth />} />
            <Route path="/404" exact render={() => <ErrorScreen />} />
            <Route render={() => <Redirect to="/404" />} />
          </Switch>
        )}
      />
    );
    return (
      <div className="App">
        <Navbar isAuth={this.state.isAuth}/>
        {routes}
      </div>
    );
  }
}

export default App;
