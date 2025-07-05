import type { Info } from "../types";

const UserInfo = (props: Info) => {
  const { id, name, email } = props;

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">User info Compo</h1>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default UserInfo;
