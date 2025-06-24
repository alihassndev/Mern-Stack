import React from "react";

const ProfileCard = () => {
  const style = {
    backgroundColor: "lightgray",
    padding: "15px",
    borderRadius: "8px",
    textColor: "black",
  };

  return (
    <div style={style}>
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis,
        doloremque!
      </p>
    </div>
  );
};

export default ProfileCard;
