import React, { useState } from "react";
import Popup from "./Popup";

const Portal = () => {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(input).then(() => {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleCopy}>Copy</button>

      <Popup copied={copied} />
    </div>
  );
};

export default Portal;
