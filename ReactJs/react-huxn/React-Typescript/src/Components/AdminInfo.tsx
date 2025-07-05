import type { AdminInfo } from "../types";

const AdminInfo = (props: AdminInfo) => {
  const { id, name, email, isAdmin } = props;

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">Admin Compo</h1>

      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>isAdmin: {isAdmin === true ? "Yes" : "No"}</p>
    </div>
  );
};

export default AdminInfo;
