import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <div className="min-h-screen mx-auto p-10">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
