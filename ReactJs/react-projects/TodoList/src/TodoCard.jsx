/* eslint-disable react/prop-types */
function TodoCard(props) {
  return (
    <li className="w-full p-3 bg-white my-3 rounded-lg flex justify-between items-center shadow-md text-lg">
      {props.item}
      <div className="flex gap-4">
        <button onClick={() => props.edit(props.todoIndex)}>
          <i className="fa-solid fa-pen-to-square cursor-pointer hover:text-blue-600 transition-all duration-200"></i>
        </button>
        <button onClick={() => props.delete(props.todoIndex)}>
          <i className="fa-solid fa-trash cursor-pointer hover:text-red-500 transition-all divide-purple-200"></i>
        </button>
      </div>
    </li>
  );
}

export default TodoCard;
