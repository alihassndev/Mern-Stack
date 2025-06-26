import React, { useState } from "react";

const Calculator = () => {
  const [value, setValue] = useState("");

  const clear = () => setValue("");

  const display = (val) => setValue(value + val);

  const calculate = () => {
    try {
      setValue(eval(value).toString());
    } catch {
      setValue("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Calculator
        </h1>

        <input
          type="text"
          value={value}
          className="w-full mb-4 text-right p-3 border border-gray-300 rounded text-xl outline-none"
          readOnly
        />

        <div className="grid grid-cols-4 gap-2 text-lg font-medium text-white">
          <button
            onClick={clear}
            className="col-span-2 bg-red-500 hover:bg-red-600 p-3 rounded"
          >
            Clear
          </button>
          <button
            onClick={() => display("/")}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded"
          >
            /
          </button>
          <button
            onClick={() => display("*")}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded"
          >
            *
          </button>

          <button
            onClick={() => display("7")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            7
          </button>
          <button
            onClick={() => display("8")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            8
          </button>
          <button
            onClick={() => display("9")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            9
          </button>
          <button
            onClick={() => display("-")}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded"
          >
            -
          </button>

          <button
            onClick={() => display("4")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            4
          </button>
          <button
            onClick={() => display("5")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            5
          </button>
          <button
            onClick={() => display("6")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            6
          </button>
          <button
            onClick={() => display("+")}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded"
          >
            +
          </button>

          <button
            onClick={() => display("1")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            1
          </button>
          <button
            onClick={() => display("2")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            2
          </button>
          <button
            onClick={() => display("3")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            3
          </button>
          <button
            onClick={calculate}
            className="row-span-2 bg-green-600 hover:bg-green-700 p-3 rounded text-xl"
          >
            =
          </button>

          <button
            onClick={() => display("0")}
            className="col-span-1 bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            0
          </button>
          <button
            onClick={() => display("00")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            00
          </button>
          <button
            onClick={() => display(".")}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
