import { useState } from "react";

export interface List {
  id: number;
  task: string;
  completed: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<List[]>([]);
  const [input, setInput] = useState<string>("");

  const addTodo = () => {
    const newTodo = {
      id: todos.length,
      task: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  return (
    <div>
      <h1 className="my-5 text-2xl font-bold">Todo App</h1>

      <div className="my-3 flex items-center gap-3">
        <input
          className="border p-2 rounded-md outline-none"
          type="text"
          placeholder="Add Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="border p-2 rounded-md cursor-pointer bg-blue-500 text-white"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-bold my-5">Your Todos</h2>
        <ul className="w-full">
          {todos.length > 0 &&
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`${
                  todo.completed ? "bg-green-50" : "bg-gray-50"
                } my-3 p-3 w-full flex justify-between items-center rounded-md shadow`}
              >
                <span>{todo.task}</span>
                <span className="text-sm text-gray-500">
                  {todo.completed ? "Completed" : "Pending"}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
