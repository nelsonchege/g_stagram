import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import Post from "./Post";
import { Bookmark, Heart, MessageSquare, ThumbsDown } from "lucide-react";

type ProfileModalDetailsProps = {
  src: string;
  bgSrc: string;
};

const ProfileModalDetails = ({ src, bgSrc }: ProfileModalDetailsProps) => {
  return (
    <div className="w-[90%] lg:w-2/3 h-3/4 bg-background border-2 bg-opacity-100 mx-auto my-auto rounded-xl shadow-lg flex flex-col lg:flex-row gap-3">
      <div className="hidden sm:block w-full lg:w-1/2  relative ">
        <Image
          src={bgSrc}
          alt={"image"}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="hidden  w-full lg:w-1/2 lg:flex md:flex-col">
        <div className="h-20 border-b-2 flex items-center pl-5 gap-5">
          <Image
            src={src}
            alt={"image"}
            width={60}
            height={60}
            className="rounded-full border-2"
          />
          <div>name</div>
          <div>follow</div>
        </div>
        <div className="flex-1">
          <div className="flex flex-grow">
            <ScrollArea className="h-[500px] w-full overflow-y-auto">
              <div className="h-[500px] flex justify-center items-center">
                <h4 className="mb-4 text-xl font-bold leading-none">
                  NO Comments
                </h4>
              </div>
            </ScrollArea>
          </div>
        </div>
        {/* comment section */}
        <div className="w-full p-4">
          <div className="w-full py-2 px-1 mb-1">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Heart size={28} />
                <MessageSquare size={28} />
                <ThumbsDown size={28} />
              </div>
              <Bookmark size={28} />
            </div>
            <div className="mt-1">0 likes</div>
          </div>
          <div>
            <span className="font-bold text-md">Briano Roloff</span>
            <span>nice pic</span>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex justify-center items-center mb-5">
        <Post
          name={"Briano Roloff"}
          src={src}
          likes={0}
          comment={"nice pic"}
          ImgSrc={bgSrc}
          isPopUp={false}
        />
      </div>
    </div>
  );
};

export default ProfileModalDetails;
