import React from "react";

import "./AuthLogin.css";

const AuthLogin = props => {
  return (
    <div className="Auth">
      <div className="Auth__Container">
        <div className="Container--Top">
          <div className="Container__Logo" />
        </div>
        <div className="Container--Mid">
          <form className="Auth__Form">
            <div className="Auth__Container__Heading">
              <div className="Heading--SVG" />
              <div className="Heading--Text">
                <h2>Login</h2>
              </div>
            </div>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <a href="/auth-password">Forgot password?</a>
            <input type="submit" value="Login" />
            <div className="Form__Error">
              <p><span></span>Wrong username or password</p>
            </div>
          </form>
        </div>
        <div className="Container--Bottom">
          <p>
            <a href="/auth-register">Register</a> for a new account
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
