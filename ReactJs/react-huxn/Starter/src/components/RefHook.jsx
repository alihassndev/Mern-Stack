import React, { useEffect, useRef, useState } from "react";

const RefHook = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <h1>UseRef</h1>
      <h2>Timer: {count}</h2>

      <button onClick={() => clearInterval(intervalRef.current)}>
        Stop Timer
      </button>
    </div>
  );
};

export default RefHook;

// =====================================

// import React, { useRef } from "react";

// const RefHook = () => {
//   const inputElement = useRef(null);
//   const focusInput = () => {
//     inputElement.current.focus();
//     inputElement.current.value = "ali";
//   };

//   return (
//     <div>
//       <h1>UseRef Hook</h1>
//       <input type="text" ref={inputElement} />
//       <button onClick={() => focusInput()}>Learn React its final call</button>
//     </div>
//   );
// };

// export default RefHook;
