import { useSearchParams } from "react-router-dom";
import Text from "../Components/Text";
import { useState, createRef } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";

function EditMeme() {
  const [params] = useSearchParams();
  const [count, setCount] = useState(0);

  const memeRef = createRef();

  const addText = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="py-10" ref={memeRef}>
          <img src={params.get("url")} alt="img" className="w-96" />
          {Array(count)
            .fill(0)
            .map((e, index) => (
              <div key={index}>
                <Text />
              </div>
            ))}
        </div>
        <div>
          <button
            className="mx-3 -translate-x-3 bg-blue-600 text-white"
            onClick={addText}
          >
            Add Text
          </button>
          <button
            className="mx-3 -translate-x-3 bg-green-600 text-white"
            onClick={() => {
              exportComponentAsJPEG(memeRef);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default EditMeme;
