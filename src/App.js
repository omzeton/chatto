import React, { Component } from "react";
import openSocket from "socket.io-client";

import Navbar from "./components/Navbar/Navbar";
import UserList from "./components/UserList/UserList";
import ChatboxArea from "./components/ChatboxArea/ChatboxArea";

import "./App.css";

class App extends Component {
  componentDidMount() {
    openSocket("http://localhost:3000");
  }
  render() {
    return (
      <div className="App">
        <div className="App--Top">
          <Navbar />
        </div>
        <div className="App--Bottom">
          <ChatboxArea />
          <UserList />
        </div>
      </div>
    );
  }
}

export default App;
