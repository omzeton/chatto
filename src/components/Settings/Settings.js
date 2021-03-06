import React, { useState } from "react";

import Avatar from "./SettingsViews/Avatar/Avatar";
import Username from "./SettingsViews/Username/Username";
import Password from "./SettingsViews/Password/Password";
import Account from "./SettingsViews/Account/Account";

import "./Settings.css";

const Settings = props => {
  const [view, setView] = useState("init");

  let settings = [];

  switch (view) {
    case "init":
      settings = [
        <div className="Mid__Btn" key={1} onClick={() => setView("avatar")}>
          <button>Change avatar</button>
        </div>,
        <div className="Mid__Btn" key={2} onClick={() => setView("username")}>
          <button>Change username</button>
        </div>,
        <div className="Mid__Btn" key={3} onClick={() => setView("password")}>
          <button>Change password</button>
        </div>,
        <div className="Mid__Btn" key={4} onClick={() => setView("account")}>
          <button>Terminate account</button>
        </div>
      ];
      break;
    case "avatar":
      settings = <Avatar />;
      break;
    case "username":
      settings = <Username />;
      break;
    case "password":
      settings = <Password />;
      break;
    case "account":
      settings = <Account onLogout={props.onLogout} />;
      break;
    default:
      break;
  }

  return (
    <div className="Settings">
      <div className="Settings__Container">
        <div className="Settings__Container__Top">
          <h2>Settings</h2>
        </div>
        <div className="Settings__Container__Mid">{settings}</div>
      </div>
    </div>
  );
};

export default Settings;
