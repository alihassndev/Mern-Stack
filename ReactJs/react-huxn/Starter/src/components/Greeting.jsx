import React from "react";

const Greeting = ({ time }) => {
  return time == "morning" ? <h1>Good morning</h1> : <h1>Good afternoon</h1>;
};

export default Greeting;
