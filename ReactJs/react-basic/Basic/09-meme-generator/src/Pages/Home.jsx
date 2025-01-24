import { useEffect, useState } from "react";
import Card from "../Components/Card";
import { getAllMemes } from "../api/Memes";

function Home() {
  const [memes, setMemes] = useState([]);
  useEffect(() => {
    getAllMemes().then((response) => setMemes(response.data.memes));
  }, []);

  return (
    <>
      <div>{memes ? <Card data={memes} /> : <div>Loading ...</div>}</div>
    </>
  );
}

export default Home;
