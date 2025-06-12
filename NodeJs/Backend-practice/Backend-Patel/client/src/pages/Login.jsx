import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="min-w-xl min-h-screen flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold">Login Here</h1>
        <div className="w-[20%] mx-auto flex flex-col gap-3">
          <Input
            name="email"
            value={user.email}
            onChange={changeHandler}
            text="email"
            placeholder="Enter email"
          />
          <Input
            value={user.password}
            onChange={changeHandler}
            text="password"
            placeholder="Enter password"
            name="password"
          />
        </div>
        <Button onClick={loginHandler} className="cursor-pointer">
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
