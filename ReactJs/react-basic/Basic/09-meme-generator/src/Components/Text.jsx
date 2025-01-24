import { useState } from "react";
import Draggable from "react-draggable";

const Text = () => {
  const [editMode, setMode] = useState(false);
  const [value, setValue] = useState("Double Click to Edit");

  return (
    <>
      <Draggable>
        <div className="text-black text-xl">
          {editMode ? (
            <input
              className="bg-transparent w-auto font-bold"
              onDoubleClick={() => setMode(false)}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <h2 className="font-bold w-fit" onDoubleClick={() => setMode(true)}>
              {value}
            </h2>
          )}
        </div>
      </Draggable>
    </>
  );
};

export default Text;
