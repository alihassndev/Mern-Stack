import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  NavLink,
} from "react-router-dom";
import { useEffect } from "react";
import "./index.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <div className="p-10 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center mb-10">Posts</h1>
        {posts ? (
          posts.map((post, index) => (
            <NavLink
              to={`/post/${post.id}`}
              className="list-none w-full bg-gray-300 p-5 rounded-xl cursor-pointer hover:bg-gray-200 shadow-lg"
              key={index}
            >
              <p className="text-lg font-semibold">{post.title}</p>
            </NavLink>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

const About = () => {
  return (
    <>
      <div>
        <h1>About Page</h1>
      </div>
    </>
  );
};

const Profile = () => {
  return (
    <>
      <div>
        <h1>Profile Page</h1>
      </div>
    </>
  );
};

const Setting = () => {
  return (
    <>
      <div>
        <h1>Setting Page</h1>
      </div>
    </>
  );
};

const SayUser = () => {
  const params = useParams();

  return (
    <>
      <div>
        <h1>
          Your name is:{" "}
          {params.userId.charAt(0).toUpperCase() + params.userId.slice(1)}
        </h1>
      </div>
    </>
  );
};

const Post = () => {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <div className="p-10">
        {data ? (
          <div>
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="text-lg">{data.body}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/user/:userId" element={<SayUser />} />

        <Route path="post">
          <Route path=":id" element={<Post />} />
        </Route>

        <Route path="account">
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
