import "./App.css";
import Count from "./Components/Count";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col gap-10">
        <button onClick={() => dispatch({ type: "increment" })}>
          Increment
        </button>
        <Count />
        <button onClick={() => dispatch({ type: "decrement" })}>
          Decrement
        </button>
      </div>
    </>
  );
}

export default App;
