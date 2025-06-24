import React, { useState } from "react";

const Test = () => {
  const [friends, setFriends] = useState(["ali", "hassan"]);
  const [text, setText] = useState("");
  const [remove, setRemove] = useState("");

  // const [counter, setCounter] = useState(0);

  // const increment = () => {
  //   setCounter(counter + 1);
  // };
  // const decrement = () => {
  //   setCounter(counter - 1);
  // };
  // const reset = () => {
  //   setCounter(0);
  // };

  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {friends.length > 0 &&
          friends.map((friend, index) => <li key={index}>{friend}</li>)}
      </ul>

      <input
        type="text"
        placeholder="Add friend"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setFriends([...friends, text]);
          setText("");
        }}
      >
        Add friend
      </button>

      <input
        type="text"
        placeholder="Remove friend"
        value={remove}
        onChange={(e) => setRemove(e.target.value)}
      />
      <button
        onClick={() => {
          setFriends(
            friends.filter((friend) => {
              friend !== remove;
            })
          );
          setRemove("");
        }}
      >
        Remove friend
      </button>

      {/* <h1>{counter}</h1> */}

      {/* <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button> */}

      {/* <h1 style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
        Welcome back Ali !
      </h1> */}
    </div>
  );
};

export default Test;
