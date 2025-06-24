import React, { useState } from "react";
import Compo2 from "./Compo2";

const Compo1 = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Component 1</h1>
      <Compo2 count={count} onClick={() => setCount(count + 1)} />
    </div>
  );
};

export default Compo1;
