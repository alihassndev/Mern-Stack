import "./App.css";
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [message, setMessage] = useState("");
  const [isResponse, setIsResponse] = useState(false);
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message.trim()) {
      generateResponse(message);
    } else {
      alert("You must write something ...");
    }
  };

  const generateResponse = async (msg) => {
    const genAI = new GoogleGenerativeAI("you api key");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const result = await model.generateContent(msg);
      const botResponse = result.response.text();

      const newMessages = [
        ...messages,
        { type: "userMsg", text: msg },
        { type: "responseMsg", text: botResponse },
      ];

      setMessages(newMessages);
      setIsResponse(true);
      setMessage("");
      console.log(botResponse);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const startNewChat = () => {
    setMessages([]); // Clear previous messages
    setIsResponse(false); // Reset chat view
  };

  return (
    <>
      <div className="body w-screen min-h-screen overflow-x-hidden bg-[#0e0e0e] text-white">
        {isResponse ? (
          <div className="h-[80vh]">
            <div className="header flex items-center justify-between w-[100vw] px-60">
              <h2 className="text-2xl">G-Assistant</h2>
              <button
                id="chatBtn"
                onClick={startNewChat}
                className="bg-[#181818] text-sm px-5 py-3 rounded-full cursor-pointer hover:bg-[#282828]"
              >
                New Chat
              </button>
            </div>

            <div className="messages p-4">
              {messages.map((msg, index) => (
                <div key={index} className={msg.type}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
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

        <div className="bottom absolute bottom-0 py-3 max-h-[20vh] bg-[#0e0e0e] m-auto flex flex-col items-center gap-5 w-[80%]">
          <div className="input-box flex items-center relative w-[80%] bg-[#181818] rounded-4xl overflow-hidden">
            <input
              value={message}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  hitRequest();
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
              className="px-6 py-4 bg-transparent flex-1 outline-none border-none"
              type="text"
              placeholder="Write your message here..."
              id="messageBox"
            />
            {message && (
              <i
                onClick={hitRequest}
                className="absolute right-0 text-blue-500 h-full p-4 flex justify-center items-center text-xl cursor-pointer transition-all duration-300"
              >
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
