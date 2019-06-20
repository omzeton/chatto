import React from "react";

import "./Generator.css";

const Generator = props => {
  const username = localStorage.getItem('username');
  return (
    <div className="Generator">
      <div className="Generator__Container">
        <div className="Container__Top__Avatar" />
        <div className="Container__Top__Heading">
          <h2>Welcome back <span>{username}</span>!</h2>
          <p>
            To connect with your friends simply paste your secret link below and
            hit <span>"Connect with room"</span>. If you wish to start a new conversation
            click <span>"Generate new link"</span> and then connect. Don't forget to save the
            link somehwere, so you can share it with other later on!
          </p>
        </div>
        <div className="Container__Mid">
          <div className="Mid__Btn">
            <button>Generate new link</button>
          </div>
          <div className="Mid__Btn">
            <button>Connect with room</button>
          </div>
        </div>
        <div className="Container__Btm">
          <input type="text" placeholder="Chatroom link" />
        </div>
      </div>
    </div>
  );
};

export default Generator;
