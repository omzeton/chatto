import React from "react";

import Settings from '../../Settings/Settings';

import './SettingsArea.css';

const SettingsArea = props => {
  return (
    <div className="SettingsArea">
      <Settings onLogout={props.onLogout}/>
    </div>
  );
};

export default SettingsArea;
