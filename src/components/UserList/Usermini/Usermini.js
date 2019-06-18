import React from "react";

import './Usermini.css';

const Usermini = props => {
  return (
      <div className="Usermini">
          <div className="Usermini__Left">
              <div className="Usermini__Left__Photo"></div>
          </div>
          <div className="Usermini__Right">
              <div className="Usermini__Right__Name">
                  <p>{props.name}</p>
              </div>
          </div>
      </div>
  );
};

export default Usermini;