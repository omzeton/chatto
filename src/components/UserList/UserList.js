import React from "react";

import Usermini from './Usermini/Usermini';

import './UserList.css';

const UserList = props => {
  return (
      <div className="UserList">
          <Usermini name="Sek Oriakaczapinge"/>
          <Usermini name="Zik"/>
          <Usermini name="Leon Bj"/>
      </div>
  );
};

export default UserList;