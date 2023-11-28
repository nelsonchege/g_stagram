import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type SUggestedUserProps = {
  comment: string;
  name: string;
  src: string;
};

const SUggestedUser = ({ name, comment, src }: SUggestedUserProps) => {
  return (
    <div className="flex items-center justify-between my-3 px-5">
      <div className="flex gap-2">
        <Image
          src={src}
          height={50}
          width={50}
          alt={"user"}
          className="rounded-md"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />

        <div className="flex flex-col">
          <span className="font-bold text-xl">{name}</span>
          <span className="font-semibold text-gray-600">{comment}</span>
        </div>
      </div>
      <span className="font-bold text-xl text-blue-800">Follow</span>
    </div>
  );
};

export default SUggestedUser;
