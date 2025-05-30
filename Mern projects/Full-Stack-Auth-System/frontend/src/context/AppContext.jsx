import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isloggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/users/data`, {
        withCredentials: true,
      });

      data.success ? setUserData(data.user) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backendUrl,
    isloggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
