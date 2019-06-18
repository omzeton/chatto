import React from "react";

import './Navbar.css';

const Navbar = props => {
  return (
      <div className="Navbar">
          <div className="Navbar__Btn">Chatto</div>
          <div />
          <div className="Navbar__Btn">Settings</div>
          <div className="Navbar__Btn">Logout</div>
      </div>
  );
};

export default Navbar;
