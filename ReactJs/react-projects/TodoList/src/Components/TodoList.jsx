/* eslint-disable react/prop-types */
import TodoCard from "../TodoCard";

function TodoList(props) {
  return (
    <ul className="w-[40%]">
      {props.todo.map((item, index) => (
        <TodoCard
          key={index}
          edit={props.handleEdit}
          delete={props.handleDelete}
          todoIndex={index}
          item={item}
        />
      ))}
    </ul>
  );
}

export default TodoList;
