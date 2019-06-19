import React from "react";
import { Link } from "react-router-dom";

import "./HomeScreen.css";

const HomeScreen = props => {
  return (
    <div className="HomeScreen">
      <div className="HomeScreen__Container">
        <div className="Container__Top">
          <div className="Container__Top--Logo" />
          <p>Exchanging messages has never been easier!</p>
        </div>
        <div className="Container__Bottom">
          <Link to="/auth-login">
            <div className="Container__Button">
              <h2>Login</h2>
            </div>
          </Link>
          <Link to="/auth-register">
            <div className="Container__Button">
              <h2>Register</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
