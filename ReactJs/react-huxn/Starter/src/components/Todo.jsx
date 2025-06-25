import React, { useState } from "react";

const Todo = () => {
  const [person, setProfile] = useState({ name: "", age: "" });

  const handleClick = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Profile</h1>

      <input
        type="text"
        name="name"
        placeholder="Update name"
        value={person.name}
        onChange={handleClick}
      />
      <input
        type="text"
        name="age"
        placeholder="Update age"
        value={person.age}
        onChange={handleClick}
      />

      <h1>{person.name}</h1>
      <h2>{person.age}</h2>
    </div>
  );
};

export default Todo;
