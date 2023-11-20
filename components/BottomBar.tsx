import { BookMarked, Film, Home, Search, View } from "lucide-react";
import React from "react";
import { Avatar } from "@nextui-org/react";

const BottomBar = () => {
  return (
    <div className="w-full block sm:hidden border-t-2  bottom-0 fixed py-5 bg-background">
      <div className="flex items-center justify-center gap-16">
        <Home size={30} />
        <Film size={30} />
        <BookMarked size={30} />
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size="md"
        />
      </div>
    </div>
  );
};

export default BottomBar;
