import React from "react";

const Compo2 = (props) => {
  return (
    <div>
      <h2>Component 2</h2>
      <h3>Count: {props.count}</h3>
      <button onClick={props.onClick}>Increment</button>
    </div>
  );
};

export default Compo2;
