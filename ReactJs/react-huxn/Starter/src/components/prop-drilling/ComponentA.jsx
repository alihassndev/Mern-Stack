import React, { createContext, useState } from "react";
import ComponentB from "./ComponentB";

export const Name = createContext();
export const SetName = createContext();

const ComponentA = () => {
  const [name, setName] = useState("ali");

  return (
    <div>
      <Name.Provider value={name}>
        <SetName.Provider value={setName}>
          <h1>Your name is {name}</h1>
          <ComponentB />
        </SetName.Provider>
      </Name.Provider>
    </div>
  );
};

export default ComponentA;
