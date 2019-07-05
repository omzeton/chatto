import React from "react";

import "./Usermini.css";

const Usermini = props => {
  return (
    <div className="Usermini">
      <div className="Usermini__Left">
        <div
          className="Usermini__Left__Photo"
          style={{ backgroundImage: `url(http://localhost:8080/${props.avatar})` }}
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

export default Usermini;
