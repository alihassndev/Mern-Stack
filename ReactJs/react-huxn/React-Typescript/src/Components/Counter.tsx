import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState<number>(0);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Counter</h1>
      <h2 className="text-8xl my-8 font-bold">{counter}</h2>

      <div className="my-5 flex gap-5">
        <button
          className="p-3 bg-blue-600 text-white cursor-pointer border rounded-lg"
          onClick={() => setCounter(counter - 1)}
        >
          Decrement
        </button>
        <button
          className="p-3 bg-red-600 text-white cursor-pointer border rounded-lg"
          onClick={() => setCounter(0)}
        >
          Reset
        </button>
        <button
          className="p-3 bg-green-600 text-white cursor-pointer border rounded-lg"
          onClick={() => setCounter(counter + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
