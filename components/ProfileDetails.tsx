import React from "react";
import ProfileModalDetails from "./ProfileModalDetails";

type ModalContentProps = {
  onClose: () => void;
  src: string;
  bgSrc: string;
};

const ModalContent = ({ src, bgSrc, onClose }: ModalContentProps) => {
  return (
    <div className="h-screen w-screen bg-black  bg-opacity-50 absolute f">
      <div className="h-full relative flex flex-col">
        <div
          className="absolute right-10 lg:right-32 top-8 lg:top-12 text-secondary dark:text-white font-extrabold text-2xl cursor-pointer dark:border-white border-2 px-3 py-1  rounded-lg"
          onClick={onClose}
        >
          x
        </div>
        <ProfileModalDetails src={src} bgSrc={bgSrc} />
      </div>
    </div>
  );
};

export default ModalContent;
