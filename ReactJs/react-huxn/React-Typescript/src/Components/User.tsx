// import type { ReactNode } from "react";

// type UserDefined = {
//   children: ReactNode;
// };
const User = (props: { name: string; age: number; isStudent: boolean }) => {
  // const User = ({ children }: UserDefined) => {
  const { name, age, isStudent } = props;

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">User Compo</h1>
      {/* {children} */}
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Student: {isStudent === true ? "Yes" : "No"}</p>
    </div>
  );
};

export default User;
