import React from "react";

import "./UserList.css";

const UserList = props => {
  return (
    <div className="UserList">
        <div className="UserList__Search__Container">
          <span className="Search__Icon" />
          <input placeholder="Search contacts" />
        </div>
      <div className="UserList--Main" />
    </div>
  );
};

export default UserList;
