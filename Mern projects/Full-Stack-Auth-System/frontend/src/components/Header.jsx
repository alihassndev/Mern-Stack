import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  return (
    <div>
      <h1 className="text-4xl font-bold my-3">
        Hey{" "}
        {userData
          ? userData.username.charAt(0).toUpperCase() +
            userData.username.slice(1)
          : "Developer"}
      </h1>
    </div>
  );
};

export default Header;
