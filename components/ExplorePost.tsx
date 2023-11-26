"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Heart, Bookmark } from "lucide-react";
import ModalContent from "./ProfileDetails";

type ExplorePostProps = {
  src: string;
  bgSrc: string;
};

const ExplorePost = ({ src, bgSrc }: ExplorePostProps) => {
  const [isHover, setIsHover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgSrc})`,
        }}
        className="border border-gray-300 dark:border-secondary h-80 cursor-pointer rounded-lg shadow-md hover:shadow-xl  bg-center bg-cover"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => setShowModal(true)}
      >
        <div className="p-6 flex flex-col justify-end h-full  hover:bg-black hover:bg-opacity-40 text-white">
          <div className="flex justify-between self-end">
            <Heart size={34} color={isHover ? "white" : "gray"} />
            <Bookmark size={34} color={isHover ? "white" : "gray"} />
          </div>
        </div>
      </div>
      {showModal &&
        createPortal(
          <ModalContent
            src={src}
            bgSrc={bgSrc}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
};

export default ExplorePost;
