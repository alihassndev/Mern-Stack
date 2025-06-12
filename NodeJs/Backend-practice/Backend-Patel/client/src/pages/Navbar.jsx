import { Button } from "@/components/ui/button";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="flex fixed w-full justify-between items-center py-4 px-16">
        <h1 className="font-bold text-lg cursor-pointer">{"Ali Hassan"}</h1>

        <div>
          <Button className="cursor-pointer">Logout</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
