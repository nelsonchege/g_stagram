"use client";

import { BookMarked, Film, Home, Search, View } from "lucide-react";
import React from "react";
import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const BottomBar = () => {
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
        <Avatar
          onClick={() => router.push("/profile")}
          className="cursor-pointer"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size="md"
        />
      </div>
    </div>
  );
};

export default BottomBar;
