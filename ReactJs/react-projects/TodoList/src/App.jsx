import { useState, useEffect } from "react";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track the index being edited

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  const handleAddTodo = (newTodo) => {
    if (editIndex !== null) {
      // Update an existing todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = newTodo;
      persistData(updatedTodos);
      setTodos(updatedTodos);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add a new todo
      persistData([...todos, newTodo]);
      setTodos([...todos, newTodo]);
    }
    setTodoValue(""); // Clear the input field
  };

  const handleDeleteTodo = (index) => {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  };

  const handleEditTodo = (index) => {
    setTodoValue(todos[index]); // Set the input field with the selected todo
    setEditIndex(index); // Set the index for editing
  };

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    let localTodo = localStorage.getItem("todos");
    if (!localTodo) {
      return;
    }
    localTodo = JSON.parse(localTodo).todos;

    setTodos(localTodo);
  }, []);

  return (
    <main>
      <div className="min-h-screen w-full flex flex-col gap-6 items-center bg-gray-100 py-16">
        <TodoInput
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          handle={handleAddTodo}
        />
        <TodoList
          handleEdit={handleEditTodo}
          handleDelete={handleDeleteTodo}
          todo={todos}
        />
      </div>
    </main>
  );
}

export default App;
