import { Heart, PlusSquare } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full sm:hidden border-b-2 flex justify-between p-5 items-center">
      <h1 style={{ fontFamily: "Billabong" }} className=" text-4xl">
        gstagram
      </h1>
      <div className="flex gap-5">
        <PlusSquare size={30} />
        <Heart size={30} />
      </div>
    </div>
  );
};

export default Navbar;
