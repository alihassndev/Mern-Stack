import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import EditMeme from "./Pages/EditMeme";
function App() {
  return (
    <>
      <div>
        <h1 className="font-bold mb-10">Meme Generator</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<EditMeme />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
