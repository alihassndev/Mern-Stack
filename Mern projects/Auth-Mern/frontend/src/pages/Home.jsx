import Signup from "./Signup";

const Home = () => {
  return (
    <>
      {/* <Signup /> */}
      <div className="min-h-screen flex flex-col justify-center  bg-gray-100 items-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-6">
            Welcome to AuthApp
          </h1>
          <p className="text-gray-600 mb-8">
            Please sign up or log in to continue
          </p>
          {/* You can uncomment the Signup component below to render the form */}
          {/* <Signup /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
