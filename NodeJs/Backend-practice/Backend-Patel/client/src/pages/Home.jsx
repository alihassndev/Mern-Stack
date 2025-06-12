import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "./Navbar";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/todos/create",
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // important if owner is tied to auth
        }
      );

      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
      } else {
        toast.error(res.data.message || "Failed to create todo");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-svh max-w-lg mx-auto flex-col gap-6 items-center justify-center">
        <h1 className="text-4xl font-bold">Todo App</h1>
        <div className="w-full flex flex-col items-center gap-6 justify-between">
          <div className="w-full flex flex-col gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Add title"
            ></Input>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Add description"
            ></Textarea>
          </div>

          <Button
            onClick={addTodoHandler}
            className="text-lg p-5 cursor-pointer"
          >
            Add Todo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
