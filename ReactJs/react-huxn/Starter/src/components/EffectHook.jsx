import React, { useEffect, useState } from "react";

const EffectHook = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();

      setData(data);
      console.log(data);
    }

    getData();
  }, []);

  return (
    <div>
      {data.length > 0 &&
        data.map((d) => (
          <div key={d.id}>
            <h2>{d.title}</h2>
            <p>{d.body}</p>
          </div>
        ))}
    </div>
  );
};

export default EffectHook;
