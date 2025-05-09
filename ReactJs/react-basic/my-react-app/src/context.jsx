import { useState, createContext } from "react";
import Context2 from "./context2";

export const userContext = createContext();

function Context() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState("Ali Hassan");

  return (
    <>
      <div className="context-box">
        <h1>Component A</h1>
        <h2>Hello {user}</h2>
        <userContext.Provider value={user}>
          <Context2 user={user} />
        </userContext.Provider>
      </div>
    </>
  );
}

export default Context;
