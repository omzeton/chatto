import React from "react";
import { NavLink } from "react-router-dom";

import "./OptionsList.css";

const OptionsList = props => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <div className="OptionsList">
      <div className="OptionsList__Logo">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/notnik-app.appspot.com/o/chatto-assets%2Flogo3-01-w.svg?alt=media&token=69fc5803-6678-485b-a65f-57710e6ceab4"
          alt="Chatto"
        />
      </div>
      <NavLink
        activeClassName="active"
        className="OptionsList__Button OptionsList__Button--ConvList"
        to="/mainView/messages"
      />
      <NavLink
        activeClassName="active"
        className="OptionsList__Button OptionsList__Button--Search"
        to="/mainView/search"
      />
      <NavLink
        activeClassName="active"
        className="OptionsList__Button OptionsList__Button--Settings"
        to="/mainView/settings"
      />
      <div className="User__Avatar--Small" style={{backgroundImage: `url(${userData.avatar})`}}></div>
      <div />
      <div className="OptionsList__Button OptionsList__Button--Logout" onClick={() => props.onLogout()}/>
    </div>
  );
};

export default OptionsList;
