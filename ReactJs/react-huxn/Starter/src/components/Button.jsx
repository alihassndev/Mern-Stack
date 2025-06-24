import React from "react";

const Button = () => {
  const handleClick = () => alert("you clicked me");
  const copyHandler = (event) => {
    event.preventDefault();
    alert("Stop stealing someone else's content. Make your own !");
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p onCopy={copyHandler}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio,
        consequatur.
      </p>
    </div>
  );
};

export default Button;
