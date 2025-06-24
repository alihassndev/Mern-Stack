import React from "react";
import { IoIosHome } from "react-icons/io";

const IconComponent = () => {
  return (
    <div>
      <h1>
        Welcome back home{" "}
        {/* <span style={{ fontSize: "30px", color: "gold" }}>
          <IoIosHome />
          </span> */}
        <IoIosHome size={30} color="gold" />
      </h1>
    </div>
  );
};

export default IconComponent;
