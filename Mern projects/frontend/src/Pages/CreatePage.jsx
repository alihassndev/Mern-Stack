import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevents form from reloading the page
    const { success, message } = await createProduct(newProduct);
    console.log(`: ${success}`);
    console.log(`message: ${message}`);

    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="pt-20 h-[80vh] flex flex-col items-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Create a Product
      </h1>

      <form
        // action={`/api/products`}
        // method="post"
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={newProduct.name}
          onChange={(e) => {
            setNewProduct({ ...newProduct, name: e.target.value });
          }}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={newProduct.price}
          onChange={(e) => {
            setNewProduct({ ...newProduct, price: e.target.value });
          }}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="image"
          placeholder="Enter image URL"
          value={newProduct.image}
          onChange={(e) => {
            setNewProduct({ ...newProduct, image: e.target.value });
          }}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          value="Create"
          onClick={handleAddProduct}
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreatePage;
