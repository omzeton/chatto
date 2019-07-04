import React, { useEffect, useState } from "react";

import Usermini from "./Usermini/Usermini";

import "./UserList.css";

const UserList = props => {
  return (
    <div className="UserList">
      <div className="UserList__Search">
        <div class="UserList__Search__Container">
          <span class="Search__Icon" />
          <input placeholder="Search" />
        </div>
      </div>
      <div className="UserList--Main" />
    </div>
  );
};

export default UserList;
