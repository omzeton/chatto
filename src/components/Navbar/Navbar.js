import React from "react";

import "./Navbar.css";

const Navbar = props => {
  return (
    <div className="Navbar">
      <div className="Navbar__Btn">
        <h2 className="Navbar__Logo">chatto</h2>
      </div>
      <div />
      <div className="Navbar__Btn">
        <input type="button" value="Settings"/>
      </div>
      <div className="Navbar__Btn">
        <input type="button" value="Log Out"/>
      </div>
    </div>
  );
};

export default Navbar;
