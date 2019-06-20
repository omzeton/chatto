import React from "react";

import Usermini from "./Usermini/Usermini";

import "./UserList.css";

const UserList = props => {
  return (
    <div className="UserList">
      <div className="UserList--Header">
        <h2>Online</h2>
      </div>
      <div className="UserList--Main">
        <Usermini name="Pysio" />
        <Usermini name="Mysio" />
      </div>
    </div>
  );
};

export default UserList;
