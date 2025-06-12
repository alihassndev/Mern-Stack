import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { RouterProvider } from "react-router";
import Home from "./pages/Home";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
