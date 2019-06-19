import React from "react";
import { withRouter } from 'react-router-dom';

import "./AuthRegister.css";

const AuthRegister = props => {
  const switchRoutes = e => {
    e.preventDefault();
    props.history.push('/auth-login');
  }
  return (
    <div className="Auth">
      <div className={["Auth__Container", "Auth__Container__Reg"].join(" ")}>
        <div className="Container--Top">
          <div className="Container__Logo" />
        </div>
        <div className={"Container--Mid"}>
          <form className={["Auth__Form", "Mid__Register"].join(" ")}>
            <div className="Auth__Container__Heading">
              <div className="Heading--SVG" />
              <div className="Heading--Text">
                <h2>Register</h2>
              </div>
            </div>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Repeat password" />
            <input type="submit" value="Register" />
            <div className="Form__Error">
              <p>
                <span />Wrong username or password
              </p>
            </div>
          </form>
        </div>
        <div className="Container--Bottom">
          <p>
            <a href="/#" onClick={e => switchRoutes(e)}>Login</a> to your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AuthRegister);
