import React from "react";
import ThemeButton from "./ThemeButton";
import { Separator } from "./ui/separator";
import SideBarItems from "./SideBarItems";
import { Film, Home, LogOut, PlusSquare, Search } from "lucide-react";
import { Avatar } from "@nextui-org/react";

const Sidebar = () => {
  return (
    <div className="hidden sm:block md:w-[5rem] lg:w-[20%] h-screen border-r-2 lg:pl-5">
      <div className="flex flex-col items-start gap-3">
        <h1
          style={{ fontFamily: "Billabong" }}
          className=" text-4xl hidden lg:block my-5 ml-5"
        >
          gstagram
        </h1>
        <Separator className="dark:bg-gray-800" />
        <div className="mt-10 lg:mt-5 w-full flex flex-col gap-5 px-3 lg:pr-5">
          <SideBarItems icon={<Home size={34} />} text={"Home"} />
          <SideBarItems icon={<Search size={34} />} text={"Search"} />
          <SideBarItems icon={<Film size={34} />} text={"Explore"} />
          <SideBarItems icon={<PlusSquare size={34} />} text={"Create Post"} />
          <SideBarItems
            icon={
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="md"
              />
            }
            text={"Profile"}
          />
        </div>
        <div className="absolute bottom-0 py-5">
          <SideBarItems icon={<LogOut size={28} />} text={"Log out"} />
          <SideBarItems icon={<ThemeButton />} text={"Change Theme"} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
