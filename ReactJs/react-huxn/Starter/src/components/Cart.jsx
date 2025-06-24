import React from "react";

const Cart = () => {
  const cart = ["apple", "banana", "peech", "pineapple", "guava"];

  return (
    <div>
      <h1>Cart 🛒</h1>

      {cart.length > 0 && <h2>You have {cart.length} items in your Cart</h2>}

      {cart.length > 0 && (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
