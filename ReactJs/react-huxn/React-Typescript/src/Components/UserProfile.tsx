import { useState } from "react";

export type Obj = {
  name: string;
  age: number;
  email: string;
};

const UserProfile = () => {
  const [user, setUser] = useState<Obj>({
    name: "",
    age: 0,
    email: "",
  });

  const updateName = (name: string) => {
    setUser((prev) => ({ ...prev, name }));
  };

  const updateAge = (age: number) => {
    setUser((prev) => ({ ...prev, age }));
  };

  const updateEmail = (email: string) => {
    setUser((prev) => ({ ...prev, email }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">User profile</h1>

      <input
        className="border mr-3 p-2 my-3 rounded-lg"
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
      />

      <input
        className="border mr-3 p-2 my-3 rounded-lg"
        type="number"
        placeholder="Age"
        value={user.age > 0 ? user.age : ""}
        onChange={(e) => updateAge(Number(e.target.value))}
      />

      <input
        className="border mr-3 p-2 my-3 rounded-lg"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => updateEmail(e.target.value)}
      />

      <h2 className="text-xl font-bold my-4">Profile Summary</h2>
      <p>{user.name}</p>
      <p>{user.age}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserProfile;
