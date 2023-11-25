"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";

type ExplorePostProps = {
  src: string;
  bgSrc: string;
};

const ExplorePost = ({ src, bgSrc }: ExplorePostProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    // TODO add background image and an opa
    <div
      style={{
        backgroundImage: `url(${bgSrc})`,
      }}
      className="border border-gray-300 dark:border-secondary h-80 cursor-pointer rounded-lg shadow-md hover:shadow-xl  bg-center bg-cover"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="p-6 flex flex-col justify-end h-full  hover:bg-black hover:bg-opacity-40 text-white">
        <div className="flex justify-between self-end">
          <Heart size={34} color={isHover ? "white" : "gray"} />
          <Bookmark size={34} color={isHover ? "white" : "gray"} />
        </div>
      </div>
    </div>
  );
};

export default ExplorePost;
