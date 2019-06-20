import React from "react";

import "./Settings.css";

const Settings = props => {
  let imageInput,
    settingsStyle = props.settingsOn
      ? { opacity: 1, zIndex: 9999 }
      : { opacity: 0, zIndex: -2 };

  return (
    <div className="Settings" style={settingsStyle}>
      <div className="Settings__Container">
        <div className="Settings__Close" onClick={props.settingsOff}>
          <h2>Close settings</h2>
        </div>
        <div className="Settings__Container__Top">
          <h2>Settings</h2>
        </div>
        <div className="Settings__Container__Mid">
          <div className="Settings__Header">
            <p>Change avatar</p>
          </div>
          <div className="Settings__Control">
            <input
              type="file"
              style={{ display: "none" }}
              ref={input => (imageInput = input)}
            />
            <button
              className="Image__Input"
              onClick={() => imageInput.click()}
            />
          </div>
          <div className="Settings__Header">
            <p>Change username</p>
          </div>
          <div className="Settings__Control">
            <input type="text" />
          </div>
          <div className="Settings__Header">
            <p>Change password</p>
          </div>
          <div className="Settings__Control">
            <input type="password" />
            <input type="password" />
          </div>
          <div className="Settings__Header">
            <p>Delete account</p>
          </div>
          <div className="Settings__Control">
            <button className="Delete__Btn">Confirm</button>
          </div>
        </div>
        <div className="Settings__Container__Btm">
          <button>Submit changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
