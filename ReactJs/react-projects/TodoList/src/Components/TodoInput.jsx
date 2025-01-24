/* eslint-disable react/prop-types */
function TodoInput(props) {
  return (
    <header className="w-[40%] flex justify-between rounded-lg overflow-hidden text-xl">
      <input
        value={props.todoValue} // Use props.todoValue to track input
        onChange={(e) => props.setTodoValue(e.target.value)} // Update parent state
        className="bg-white w-[85%] p-3 outline-none"
        type="text"
        placeholder="Enter todo..."
      />
      <button
        onClick={() => {
          if (props.todoValue.trim() !== "") {
            props.handle(props.todoValue); // Call handle function
          }
        }}
        className="p-3 bg-white w-[15%] border-l-2 font-bold hover:bg-gray-200 transition-all duration-300"
      >
        {props.todoValue !== "" ? "Save" : "Add"}
      </button>
    </header>
  );
}

export default TodoInput;
