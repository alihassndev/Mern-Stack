import React from "react";

const CreatePage = () => {
  return (
    <div className="pt-20 h-[80vh] flex flex-col items-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Create a Product
      </h1>

      <form className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="image"
          placeholder="Enter image URL"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          value="Create"
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreatePage;
