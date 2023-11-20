import { Bookmark, Heart, MessageSquare, ThumbsDown } from "lucide-react";
import Image from "next/image";
import React from "react";

type PostProps = { name: string; src: string };

const Post = ({ name, src }: PostProps) => {
  return (
    <div className="w-[95%] md:w-[600px]  flex flex-col mb-2">
      <div className="p-3 flex gap-3 items-center">
        <div>
          <Image
            src={src}
            height={60}
            width={60}
            alt={"user"}
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="font-bold text-xl">{name}</h2>
          <span className="font-semibold text-gray-600">2 days ago</span>
        </div>
      </div>
      <div className=" border h-[500px] rounded-lg">image</div>
      <div className="w-full">
        <div className="w-full py-2 px-1 mb-1">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Heart size={28} />
              <MessageSquare size={28} />
              <ThumbsDown size={28} />
            </div>
            <Bookmark size={28} />
          </div>
          <div className="mt-1">20000 likes</div>
        </div>
        <div>
          <span className="font-bold text-md">{name}</span>
          <span> comments</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
