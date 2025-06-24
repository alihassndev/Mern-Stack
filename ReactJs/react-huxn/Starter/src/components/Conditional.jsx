import React from "react";

const Conditional = (props) => {
  const ValidPassword = () => <h1>Password is valid</h1>;
  const InvalidPassword = () => <h1>Password is invalid</h1>;

  return props.valid ? <ValidPassword /> : <InvalidPassword />;
};

export default Conditional;
