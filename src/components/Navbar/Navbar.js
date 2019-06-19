import React from "react";

import "./Navbar.css";

const Navbar = props => {
  const logoutHandler = e => {
    e.preventDefault();
    props.setStateOnLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("userSettings");
  };
  let buttons = props.isAuth ? (
    <>
      <div className="Navbar__Btn">
        <input type="button" value="Settings" />
      </div>
      <div className="Navbar__Btn">
        <input type="button" value="Log Out" onClick={e => logoutHandler(e)}/>
      </div>
    </>
  ) : (
    <div className="Navbar__Btn" style={{ gridColumn: 4 }}>
      <input type="button" value="Get started" />
    </div>
  );
  return (
    <div className="Navbar">
      <div className={["Navbar__Btn", "Navbar__Logo"].join(" ")} />
      <div />
      {buttons}
    </div>
  );
};

export default Navbar;
