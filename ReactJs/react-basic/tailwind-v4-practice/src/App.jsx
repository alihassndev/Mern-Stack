import "./App.css";

function App() {
  return (
    <>
      <div className="cards min-h-screen w-full flex justify-center items-center bg-violet-200 border-violet-500  dark:text-white">
        {/* here text-8xl does not work so i make it important to overwrite the tailwind v-4 typography */}
        <h1 className="!text-5xl font-mono">Hello There</h1>
      </div>
      <div className="bg-cyan-200 min-h-screen border-2 w-full border-violet-500 flex justify-center items-center rounded-md sticky top-0">
        {/* here text-8xl does not work so i make it important to overwrite the tailwind v-4 typography */}
        <h1 className="!text-5xl font-mono">Hello Ali</h1>
      </div>
      <div className="bg-blue-200 min-h-screen border-2 w-full border-violet-500 flex justify-center items-center rounded-md sticky top-0">
        {/* here text-8xl does not work so i make it important to overwrite the tailwind v-4 typography */}
        <h1 className="!text-5xl font-mono">Hello Hassan</h1>
      </div>

      {/* Accent -> use just before any property like to change the select radio color */}
      {/* Fluid text, File, Highlight, less javascript */}
    </>
  );
}

export default App;
