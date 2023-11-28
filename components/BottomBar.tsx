"use client";

import { BookMarked, Film, Home, Search, View } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import UsersAvatar from "./UsersAvatar";

type BottomBarProps = {
  src: string;
};
const BottomBar = ({ src }: BottomBarProps) => {
  const router = useRouter();

  return (
    <div className="w-full block sm:hidden border-t-2  bottom-0 fixed py-5 bg-background">
      <div className="flex items-center justify-center gap-16">
        <Home
          size={30}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        <Film
          size={30}
          className="cursor-pointer"
          onClick={() => router.push("/explore")}
        />
        <BookMarked
          size={30}
          className="cursor-pointer"
          onClick={() => router.push("/saved")}
        />
        <UsersAvatar src={src} onClick={() => router.push("/saved")} />
      </div>
    </div>
  );
};

export default BottomBar;
