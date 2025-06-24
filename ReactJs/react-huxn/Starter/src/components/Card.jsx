import React from "react";

// we can also destructure this like /' {children} '/
const Card = (props) => {
  return (
    <div>
      {/* <h1>Card Component</h1> */}
      <div>{props.children}</div>
    </div>
  );
};

export default Card;
