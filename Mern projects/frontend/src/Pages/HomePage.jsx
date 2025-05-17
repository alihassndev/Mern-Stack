import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="pt-16 h-[80vh] flex flex-col justify-start items-center">
        <h1 className="font-bold text-3xl text-blue-700">Current Products</h1>

        <p className="my-5 text-lg">
          No Products Found.{" "}
          <a className="text-blue-600 hover:text-blue-400" href="/create">
            Create Product
          </a>
        </p>
      </div>
    </>
  );
};

export default HomePage;
