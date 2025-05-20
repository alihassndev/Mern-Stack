import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        console.log(response);
        setJokes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Welcome to frontend</h1>
        <h3>Jokes: {jokes.length}</h3>

        <div className="jokes">
          {jokes.map((joke) => {
            return (
              <div className="joke" key={joke.id}>
                <h3>{joke.title}</h3>
                <p>{joke.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
