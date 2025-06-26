import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="min-h-screen max-w-full flex flex-col gap-10 justify-center items-center">
      <h1 className="text-center text-5xl font-bold">Counter App</h1>
      <h2 className="text-center text-6xl mb-5">Count: {count}</h2>

      <div className="flex gap-10 justify-center items-center text-lg">
        <button
          className="border py-2 px-5 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 cursor-pointer"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="border py-2 px-5 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer"
          onClick={handleDecrement}
        >
          Decrement
        </button>
        <button
          className="border py-2 px-5 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
