import React from "react";

const UserStatus = ({ isLoggedin, isAdmin }) => {
  return (
    <div>
      {isLoggedin && isAdmin && <h1>Welcome Admin!</h1>}
      {isLoggedin && !isAdmin && <h1>Welcome User!</h1>}
      {!isLoggedin && <h1>Please log in.</h1>}
    </div>
  );
};

export default UserStatus;
