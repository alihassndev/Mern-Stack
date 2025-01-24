import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function Card(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {props.data &&
          props.data.map((meme, index) => (
            <div
              className="w-[24vw] flex flex-col justify-center items-center border p-5 rounded-lg h-fit bg-white text-black"
              key={index}
            >
              <img className="w-48" src={meme.url} alt={meme.name} />
              <div className="flex flex-col gap-5 mt-6 w-48">
                <h2>{meme.name}</h2>
                <button
                  onClick={() => navigate(`/edit/?url=${meme.url}`)}
                  className="bg-blue-600 text-white w-48"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Card;
