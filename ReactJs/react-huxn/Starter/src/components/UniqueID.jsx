import React, { useId } from "react";

const UniqueID = () => {
  const id = useId();

  return (
    <div>
      <h1>UniqueID</h1>

      <label htmlFor={`${id}-email`}>Email: </label>
      <input type="email" id={`${id}-email`} />

      <br />

      <label htmlFor={`${id}-password`}>Password: </label>
      <input type="password" id={`${id}-password`} />
    </div>
  );
};

export default UniqueID;
