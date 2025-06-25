import React, { useReducer, useState } from "react";

const initial = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };

    case "decrement":
      return { ...state, count: state.count - 1 };

    case "incrementByAmount":
      return { ...state, count: state.count + action.payload };

    case "decrementByAmount":
      return { ...state, count: state.count - action.payload };

    case "reset":
      return { ...state, count: 0 };

    default:
      return state;
  }
};

const ComponentB = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const [value, setValue] = useState(0);

  return (
    <div>
      <h1>UseReducer Hook</h1>
      <h2>Counter: {state.count}</h2>

      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>=</button>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={() => {
          dispatch({ type: "incrementByAmount", payload: +value });
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          dispatch({ type: "decrementByAmount", payload: +value });
        }}
      >
        Subtract
      </button>
    </div>
  );
};

export default ComponentB;
