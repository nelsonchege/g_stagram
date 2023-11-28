import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UsersAvatarProps = {
  src: string;
  onClick?: () => void;
};

const UsersAvatar = ({ src, onClick }: UsersAvatarProps) => {
  return (
    <button onClick={onClick}>
      <Avatar>
        <AvatarImage src={src ? src : "https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </button>
  );
};

export default UsersAvatar;
