import "./App.css";
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [isResponse, setReponse] = useState(true);

  const handle = () => {
    setReponse("");
  };

  return (
    <>
      <div className="body w-screen min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
        {isResponse ? (
          <div className="h-[80vh]"></div>
        ) : (
          <div className="middle h-[80vh] flex items-center flex-col justify-center w-[80vw] m-auto">
            <h1 className="text-4xl font-semibold">G-Assistant</h1>

            <div className="boxes mt-6 flex items-center gap-3 flex-wrap">
              <div className="card relative min-h-[20vh] bg-[#181818] px-[20px] p-[10px] rounded-lg cursor-pointer transition-all hover:bg-[#242424]">
                <p className="text-lg">What are you coding.</p>
                <p className="text-lg">How can we learn it?</p>
                <i className="absolute right-3 bottom-3 text-2xl">
                  <IoCodeSlash />
                </i>
              </div>

              <div className="card relative min-h-[20vh] bg-[#181818] px-[20px] p-[10px] rounded-lg cursor-pointer transition-all hover:bg-[#242424]">
                <p className="text-lg">Which is the red</p>
                <p className="text-lg">planet of solar system?</p>
                <i className="absolute right-3 bottom-3 text-2xl">
                  <BiPlanet />
                </i>
              </div>

              <div className="card relative min-h-[20vh] bg-[#181818] px-[20px] p-[10px] rounded-lg cursor-pointer transition-all hover:bg-[#242424]">
                <p className="text-lg">In which year python</p>
                <p className="text-lg">was invented?</p>
                <i className="absolute right-3 bottom-3 text-2xl">
                  <FaPython />
                </i>
              </div>

              <div className="card relative min-h-[20vh] bg-[#181818] px-[20px] p-[10px] rounded-lg cursor-pointer transition-all hover:bg-[#242424]">
                <p className="text-lg">How can we use</p>
                <p className="text-lg">the AI for Adopt?</p>
                <i className="absolute right-3 bottom-3 text-2xl">
                  <TbMessageChatbot />
                </i>
              </div>
            </div>
          </div>
        )}

        <div className="bottom m-auto flex flex-col items-center gap-5 w-[80%]">
          <div className="input-box flex items-center relative w-[80%]  bg-[#181818] rounded-4xl overflow-hidden">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="p-4 bg-transparent flex-1 outline-none border-none"
              type="text"
              placeholder="Write your message here..."
              id="messageBox"
            />
            {message == "" ? (
              ""
            ) : (
              <i className="absolute right-0 text-blue-500 h-full p-4 flex justify-center items-center text-xl cursor-pointer transition-all duration-300">
                <IoSend />
              </i>
            )}
          </div>

          <p className="text-gray-300">
            G-Assistant is developed by Ali Hassan. This AI uses the Gemini API
            for responses.
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
