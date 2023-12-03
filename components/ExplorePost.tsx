"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, Bookmark } from "lucide-react";
import ModalContent from "./ProfileDetails";
import { trpc } from "@/app/_trpc/client";

type ExplorePostProps = {
  src: string;
  bgSrc: string;
  PostDetails: any;
};

const ExplorePost = ({ src, bgSrc, PostDetails }: ExplorePostProps) => {
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
        <div className="p-6 flex flex-col justify-end h-full  hover:bg-black hover:bg-opacity-40 text-white" />
      </div>
      {showModal &&
        createPortal(
          <ModalContent
            src={src}
            bgSrc={bgSrc}
            PostDetails={PostDetails}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
};

export default ExplorePost;
