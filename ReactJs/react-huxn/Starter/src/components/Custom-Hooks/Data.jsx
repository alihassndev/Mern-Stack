import React from "react";
import useFetch from "./useFetch";

const Data = () => {
  const [data] = useFetch("https://jsonplaceholder.typicode.com/posts");
  return (
    <div>
      <h1>Fetch Data</h1>
      {data && data.map((d) => <li key={d.id}>{d.title}</li>)}
    </div>
  );
};

export default Data;
