import React from "react";

import "./OptionsList.css";

const OptionsList = props => {
  return (
    <div className="OptionsList">
      <div className="OptionsList__Logo">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/notnik-app.appspot.com/o/chatto-assets%2Flogo3-01-w.svg?alt=media&token=69fc5803-6678-485b-a65f-57710e6ceab4"
          alt="Chatto"
        />
      </div>
      <div className="OptionsList__Button OptionsList__Button--ConvList active" onClick={() => props.onChangeView("messages")}/>
      <div className="OptionsList__Button OptionsList__Button--Search" onClick={() => props.onChangeView("search")}/>
      <div className="OptionsList__Button OptionsList__Button--User"  onClick={() => props.onChangeView("user")}/>
      <div className="OptionsList__Button OptionsList__Button--Settings"  onClick={() => props.onChangeView("settings")}/>
      <div />
      <div className="OptionsList__Button OptionsList__Button--Logout" />
    </div>
  );
};

export default OptionsList;
