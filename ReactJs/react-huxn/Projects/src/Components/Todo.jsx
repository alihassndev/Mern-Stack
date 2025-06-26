import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodo] = useState([]);
  const [value, setValue] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleClick = () => {
    if (!value.trim()) return;
    setTodo([...todos, value]);
    setValue("");
  };

  const handleDelete = (index) => {
    const filtered = todos.filter((_, i) => i !== index);
    setTodo(filtered);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  const handleUpdate = () => {
    const updated = todos.map((todo, i) =>
      i === editIndex ? editValue : todo
    );
    setTodo(updated);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden flex flex-col justify-center items-center py-10">
      <h1 className="text-4xl font-bold">Todo App</h1>

      <div className="w-[60%] my-10">
        <input
          className="outline-none border border-gray-300 rounded-l-lg w-[90%] p-2"
          type="text"
          placeholder="Enter Todo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          className="py-2 px-3 bg-green-600 cursor-pointer text-white hover:bg-green-700 rounded-r-lg border border-green-600"
          onClick={handleClick}
        >
          Add Todo
        </button>
      </div>

      <div className="w-[60%] flex flex-col gap-4">
        {todos.map((todo, index) => (
          <div
            className="w-full p-3 rounded-lg mx-auto flex justify-between items-center border border-gray-300 text-lg"
            key={index}
          >
            {editIndex === index ? (
              <input
                className="border p-1 rounded w-[60%]"
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <p>{todo}</p>
            )}

            <div className="flex justify-center gap-5">
              {editIndex === index ? (
                <button
                  onClick={handleUpdate}
                  className="py-2 px-3 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 cursor-pointer"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className="py-2 px-3 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 cursor-pointer"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(index)}
                className="py-2 px-3 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
