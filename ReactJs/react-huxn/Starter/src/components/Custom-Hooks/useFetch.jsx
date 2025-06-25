import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setDate] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      const res = await fetch(url);
      const data = await res.json();

      setDate(data);
    };

    fetchData();
  }, [url]);

  return [data];
};

export default useFetch;
