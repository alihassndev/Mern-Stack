import React from "react";

// const User = (props) => {
//   return (
//     <div>
//       <h2>{props.name}</h2>
//       <p>{props.age}</p>
//       <p>{props.address}</p>
//       <p>{props.profession}</p>
//       <p>{props.isMarried ? "Yes" : "No"}</p>
// <p>Hobbies: </p>
//     <ul>
//         {props.hobbies.map((h, index) => (
//         <li key={index}>{h}</li>
//         ))}
//     </ul>
//     </div>
//   );
// };

const User = ({ name, address, profession, age, isMarried, hobbies }) => {
  return (
    <div>
      <h3>Name: {name}</h3>
      <p>Age: {age}</p>
      <p>Address: {address}</p>
      <p>Profession: {profession}</p>
      <p>Married: {isMarried ? "Yes" : "No"}</p>
      <p>Hobbies: {hobbies.join(", ")}</p>
      {/* <ul>
        {hobbies.map((h, index) => (
          <li key={index}>{h}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default User;
