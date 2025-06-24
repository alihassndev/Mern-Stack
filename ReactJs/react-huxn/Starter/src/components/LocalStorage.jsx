import React, { useEffect, useState } from "react";

const LocalStorage = () => {
  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("name");
    return savedName ? JSON.parse(savedName) : "";
  });

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
  }, [name]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const clearName = () => {
    setName("");
  };

  return (
    <div>
      <h1>Your name: {name}</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleChange}
      />
      {/* <button>Add name</button> */}
      <button onClick={clearName}>Clear name</button>
    </div>
  );
};

export default LocalStorage;
