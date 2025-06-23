import React from "react";

const MainContent = () => {
  //   const name = "Ali";
  //   const multiply = (a, b) => a * b;
  //   const specialClass = "Special";
  //   const fruits = ["apple", "banana", "peech", "pineapple", "guava"];
  const list = [
    { username: "Ali", email: "ali@gmail.com", location: "Sialkot" },
    { username: "hassan", email: "hassan@gmail.com", location: "Sialkot" },
    {
      username: "Ali Hassan",
      email: "alihassan@gmail.com",
      location: "Lahore",
    },
    { username: "Ibrahim", email: "ibrahim@gmail.com", location: "Lahore" },
    { username: "Ahsan", email: "ahsan@gmail.com", location: "Islamabad" },
    { username: "Ahmed", email: "ahmed@gmail.com", location: "Karachi" },
  ];

  return (
    <main>
      <ol>
        {list.map((obj, index) => (
          <li key={index}>
            <ul>
              <li>
                <h2>{obj.username}</h2>
              </li>
              <li>
                <p>{obj.email}</p>
              </li>
              <li>
                <p>{obj.location}</p>
              </li>
            </ul>
          </li>
        ))}
      </ol>
      {/* <h2>Hello {name}</h2>
      <p>My friend list: {["ali", "hassan", "yusuf"]}</p>

      <p>2*3 = {multiply(2, 3)}</p>

      <p className={specialClass}>This is special class</p>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul> */}
    </main>
  );
};

export default MainContent;
