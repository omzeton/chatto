import React from "react";
import { withRouter } from "react-router-dom";

import "./Usermini.css";

const Usermini = props => {
  const connectToUser = url => props.history.push(`/mainView/messages/${url}`);
  return (
    <div className="Usermini" onClick={() => connectToUser(props.url)}>
      <div className="Usermini__Left">
        <div
          className="Usermini__Left__Photo"
          style={{
            backgroundImage: `url(https://chatto--api.herokuapp.com/${props.avatar})`
          }}
        />
      </div>
      <div className="Usermini__Right">
        <div className="Usermini__Right__Name">
          <p>{props.username}</p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Usermini);
