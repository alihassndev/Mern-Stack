import React from "react";

const Header = () => {
  const name = "Ali Hassan";
  const date = new Date();

  return (
    <header>
      <h1>Welcome to my website, {name} !</h1>
      <p>{date.toDateString()}</p>
    </header>
  );
};

export default Header;
