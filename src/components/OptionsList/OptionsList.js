import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import "./OptionsList.css";

const OptionsList = props => {
  const [currentPath, setCurrentPath] = useState(props.match.url);
  useEffect(() => {
    setCurrentPath(props.match.url);
    //eslint-disable-next-line
  }, [props.match.url]);

  const convStyles = ["OptionsList__Button", "OptionsList__Button--ConvList"];
  const searchStyles = ["OptionsList__Button", "OptionsList__Button--Search"];
  const settingsStyles = [
    "OptionsList__Button",
    "OptionsList__Button--Settings"
  ];
  const url = currentPath.split("/mainView/")[1];
  if (url === "settings") {
    settingsStyles.push("active");
  } else if (url === "search") {
    searchStyles.push("active");
  } else {
    convStyles.push("active");
  }
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="OptionsList">
      <div className="OptionsList__Logo">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/notnik-app.appspot.com/o/chatto-assets%2Flogo3-01-w.svg?alt=media&token=69fc5803-6678-485b-a65f-57710e6ceab4"
          alt="Chatto"
        />
      </div>
      {/* I chose Link over NavLink because I want the button to have "active" class after /messages path, not just /messages/:id. */}
      <Link className={convStyles.join(" ")} to="/mainView/messages/:id" />
      <Link className={searchStyles.join(" ")} to="/mainView/search" />
      <Link className={settingsStyles.join(" ")} to="/mainView/settings" />
      <div
        className="User__Avatar--Small"
        style={{ backgroundImage: `url(${userData.avatar})` }}
      />
      <div />
      <div
        className="OptionsList__Button OptionsList__Button--Logout"
        onClick={() => props.onLogout()}
      />
    </div>
  );
};

export default withRouter(OptionsList);
