import React, { useEffect, useState } from "react";
import axios from "axios";

const Meals = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => {
        console.log(res);

        setItems(res.data.meals);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-screen py-10">
      <h1 className="text-4xl font-bold mb-12 text-center ">Meals</h1>

      <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto">
        {items &&
          items.map(({ strMeal, strMealThumb, idMeal }) => (
            <div
              className="flex flex-col gap-3 border border-gray-300 p-5 rounded-lg"
              key={idMeal}
            >
              <img className="w-full" src={strMealThumb} alt="img" />
              <div className="flex justify-between">
                <p>{strMeal}</p>
                <p className="font-bold">#{idMeal}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Meals;
