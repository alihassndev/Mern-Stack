import React from "react";

const MainContent = () => {
  const name = "Ali";
  const multiply = (a, b) => a * b;
  const specialClass = "Special";

  return (
    <main>
      <h2>Hello {name}</h2>
      <p>My friend list: {["ali", "hassan", "yusuf"]}</p>

      <p>2*3 = {multiply(2, 3)}</p>

      <p className={specialClass}>This is special class</p>
    </main>
  );
};

export default MainContent;
