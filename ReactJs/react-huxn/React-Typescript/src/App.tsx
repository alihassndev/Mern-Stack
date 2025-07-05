// import Button from "./Components/Button";
// import User from "./Components/User";
// import UserInfo from "./Components/UserInfo";
// import AdminInfo from "./Components/AdminInfo";
// import Counter from "./Components/Counter";
// import UserProfile from "./Components/UserProfile";

import Todo from "./Components/Todo";

const App = () => {
  return (
    <div className="w-[90%] mx-auto">
      {/* <User name="Ali" age={22} isStudent={true} /> */}

      {/* <User>
        <p>Hello</p>
      </User> */}

      {/* <Button
        label="Click me"
        onClick={() => {
          alert("clicked !");
        }}
        disable={false}
      /> */}

      {/* <UserInfo id={1} name="world" email="world@gmail.com" /> */}
      {/* <AdminInfo id={1} name="world" email="world@gmail.com" isAdmin={true} /> */}

      {/* <Counter /> */}

      {/* <UserProfile /> */}

      <Todo />
    </div>
  );
};

export default App;
