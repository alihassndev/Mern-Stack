import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { IoBagAdd } from "react-icons/io5";
import Data from "./Ecommerce/Data"; // Ensure the path is correct

const Form = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    color: "",
    company: "",
  });

  const updateFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const matchesFilter = (item) => {
    const matchCategory =
      !filters.category || item.category === filters.category;
    const matchCompany =
      !filters.company ||
      item.company.toLowerCase() === filters.company.toLowerCase();
    const matchColor =
      !filters.color ||
      item.color.toLowerCase() === filters.color.toLowerCase();

    const [minPrice, maxPrice] = filters.price
      ? filters.price.split("-").map(Number)
      : [0, Infinity];
    const price = Number(item.newPrice);
    const matchPrice = price >= minPrice && price <= maxPrice;

    const matchSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      matchCategory && matchCompany && matchColor && matchPrice && matchSearch
    );
  };

  const filteredData = Data.filter(matchesFilter);

  return (
    <div>
      {/* Navigation */}
      <div className="flex fixed top-0 w-full justify-between items-center px-10 py-5 bg-white shadow-md z-50">
        <BsCartPlus />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md w-1/2"
        />
        <div className="flex items-center gap-4 text-xl">
          <FaRegHeart />
          <IoBagAdd />
          <RxAvatar />
        </div>
      </div>

      {/* Sidebar */}
      <section className="flex justify-center items-center">
        <div className="fixed left-0 top-20 w-64 h-full p-12 border-r-2 border-r-gray-100">
          <div>
            <h2 className="font-bold mb-2">Category</h2>
            {["", "sneakers", "flats", "sandals", "heels"].map((cat) => (
              <div key={cat}>
                <input
                  className="mr-2"
                  type="radio"
                  id={cat || "all"}
                  name="category"
                  onChange={() => updateFilter("category", cat)}
                />
                <label htmlFor={cat || "all"}>{cat || "All"}</label>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h2 className="font-bold mb-2">Price</h2>
            {["", "0-50", "50-100", "100-150", "150-200"].map((price) => (
              <div key={price}>
                <input
                  className="mr-2"
                  type="radio"
                  id={price || "allprice"}
                  name="price"
                  onChange={() => updateFilter("price", price)}
                />
                <label htmlFor={price || "allprice"}>{price || "All"}</label>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h2 className="font-bold mb-2">Colors</h2>
            {["", "black", "blue", "green", "red", "white"].map((color) => (
              <div key={color}>
                <input
                  className="mr-2"
                  type="radio"
                  id={color || "allcolor"}
                  name="color"
                  onChange={() => updateFilter("color", color)}
                />
                <label htmlFor={color || "allcolor"}>{color || "All"}</label>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended */}
      <div className="absolute top-0 mt-28 ml-80">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Recommended</h1>
        <div className="flex gap-4 flex-wrap">
          {["", "Nike", "Adidas", "Puma", "Vans"].map((brand, index) => (
            <button
              key={index}
              onClick={() => updateFilter("company", brand)}
              className={`px-4 py-2 bg-white text-gray-800 border rounded-lg shadow-sm hover:bg-gray-200 transition duration-200 ${
                filters.company === brand ? "bg-gray-300" : ""
              }`}
            >
              {brand || "All Products"}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="mt-56 ml-80 w-[70%] min-h-screen">
        <div className="grid grid-cols-3 gap-10 p-4">
          {filteredData.map((prod, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <img src={prod.img} alt={prod.title} className="p-6" />
              <p className="text-lg font-bold line-clamp-1">{prod.title}</p>
              <div className="flex justify-between items-center text-sm my-1">
                <div className="flex gap-1">{Array(5).fill(prod.star)}</div>
                <span>{prod.reviews}</span>
              </div>
              <div className="flex justify-between">
                <p className="flex gap-2">
                  <span className="line-through">{prod.prevPrice}</span>
                  <span>${prod.newPrice}</span>
                </p>
                <IoBagAdd />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
