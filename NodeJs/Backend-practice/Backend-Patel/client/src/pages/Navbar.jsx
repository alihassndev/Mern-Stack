import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex fixed w-full justify-between items-center py-4 px-16">
        <h1 className="font-bold text-lg cursor-pointer">{"Ali Hassan"}</h1>

        <div>
          <Button onClick={logoutHandler} className="cursor-pointer">
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
