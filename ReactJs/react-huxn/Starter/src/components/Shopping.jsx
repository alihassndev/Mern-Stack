import React, { useState } from "react";

const Shopping = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState();

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={() => setItems([...items, { name, quantity }])}>
        Add
      </button>

      <ul>
        {items.map((i, n) => (
          <li key={n}>
            {i.name} - {i.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shopping;
