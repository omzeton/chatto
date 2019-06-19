import React from "react";

import "./ErrorScreen.css";

const ErrorScreen = props => {
  return (
    <div className="ErrorScreen">
      <div className="ErrorScreen__Container">
        <div className="Error--SVG" />
        <h2>Page not found</h2>
        <h3>
          The page you requested does not exist!
          <br />
          To get back to home screen press this <a href="/">link</a>.
        </h3>
      </div>
    </div>
  );
};

export default ErrorScreen;
