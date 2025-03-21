"use client";

import { trpc } from "@/app/_trpc/client";
import React, { ReactNode } from "react";

type BioProps = {
  src: string | null | undefined;
  username: string;
};

const Bio = ({ src, username }: BioProps) => {
  const { data: likedpost } = trpc.getLikedPost.useQuery("length");
  const { data: posts } = trpc.getPosts.useQuery({
    category: "personal",
    type: "length",
  });
  const { data: savedpost } = trpc.getSavedPost.useQuery("length");
  return (
    <div className="w-full lg:w-2/3 p-3 flex gap-3 lg:gap-10">
      <div
        className="w-32 h-32  md:w-44 md:h-44  lg:w-60 lg:h-60 relative border border-purple-700 bg-center bg-cover rounded-full"
        style={{
          backgroundImage: `url(${
            src
              ? src
              : `https://images.unsplash.com/photo-1700630218434-58d96acec155?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
          })`,
        }}
      ></div>
      <div className="flex-1 flex flex-col gap-10">
        <div className="flex justify-between lg:w-2/3">
          <h1 className="font-bold text-3xl">{username}</h1>
        </div>

        <div className=" flex gap-12 w-2/3">
          <div className="flex flex-col items-center text-xl">
            <div>post</div>
            <div className="font-bold ">{posts as ReactNode}</div>
          </div>
          <div className="flex flex-col items-center  text-xl">
            <div>liked</div>
            <div className="font-bold ">{likedpost as ReactNode}</div>
          </div>
          <div className="flex flex-col items-center  text-xl">
            <div>saved</div>
            <div className="font-bold">{savedpost as ReactNode}</div>
          </div>
        </div>
        <p className="lg:w-2/3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe amet
          nostrum fuga provident veniam harum debitis voluptas illo,
        </p>
        <div />
      </div>
    </div>
  );
};

export default Bio;
