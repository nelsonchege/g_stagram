import React from "react";
import ThemeButton from "./ThemeButton";

const Sidebar = () => {
  return (
    <div className="hidden sm:block md:w-[5rem] lg:w-[20%] h-screen border-r-4">
      <ThemeButton />
    </div>
  );
};

export default Sidebar;
