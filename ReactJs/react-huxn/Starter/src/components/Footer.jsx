import React from "react";

const Footer = () => {
  const product = {
    name: "Leather jacket",
    price: 120,
    availability: "In-stock",
  };

  return (
    <footer>
      <div>
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <h5>{product.availability}</h5>
      </div>
      <p>&copy; 2025 My Website</p>
    </footer>
  );
};

export default Footer;
