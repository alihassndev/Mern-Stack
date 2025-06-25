import { useContext } from "react";
import { Name, SetName } from "./ComponentA";

const ComponentC = () => {
  const name = useContext(Name);
  const setName = useContext(SetName);

  return (
    <div>
      <h3>your name is {name}</h3>

      <button onClick={() => setName("Hassan")}>Click me</button>
    </div>
  );
};

export default ComponentC;
