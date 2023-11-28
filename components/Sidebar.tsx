"use client";

import React from "react";
import ThemeButton from "./ThemeButton";
import { Separator } from "./ui/separator";
import SideBarItems from "./SideBarItems";
import { BookMarked, Film, Home, LogOut, PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import UsersAvatar from "./UsersAvatar";

type SidebarProps = {
  src: string;
};

const Sidebar = ({ src }: SidebarProps) => {
  const router = useRouter();
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
          <SideBarItems
            icon={<Home size={34} />}
            text={"Home"}
            routeFunction={() => router.push("/")}
          />
          <SideBarItems
            icon={<Film size={34} />}
            text={"Explore"}
            routeFunction={() => router.push("/explore")}
          />
          <SideBarItems
            icon={<PlusSquare size={34} />}
            text={"Create Post"}
            routeFunction={() => router.push("/create_post")}
          />
          <SideBarItems
            icon={<BookMarked size={34} />}
            text={"Saved"}
            routeFunction={() => router.push("/saved")}
          />
          <SideBarItems
            icon={<UsersAvatar src={src} />}
            text={"Profile"}
            routeFunction={() => router.push("/profile")}
          />
        </div>
        <div className="absolute bottom-0 py-5">
          <SideBarItems
            icon={<LogOut size={28} className="ml-4" />}
            text={"Log out"}
            routeFunction={() => signOut()}
          />
          <SideBarItems
            icon={<ThemeButton />}
            text={"Change Theme"}
            routeFunction={() => console.log("here at theme")}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
