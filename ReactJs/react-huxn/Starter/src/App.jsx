// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import MainContent from "./components/MainContent";

import User from "./components/User";

const App = () => {
  return (
    <>
      <div>
        <User
          name="Ali"
          address="Lahore"
          profession="Software Eng."
          age={22}
          isMarried={false}
          hobbies={["sleeping", "eating", "watching movies"]}
        />
        {/* <Header />
        <MainContent />
        <Footer /> */}
      </div>
    </>
  );
};

export default App;
