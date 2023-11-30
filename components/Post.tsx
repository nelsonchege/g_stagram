"use client";

import { Bookmark, Heart, MessageSquare, ThumbsDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";

type PostProps = {
  name: string;
  src: string;
  likes: number;
  comment: string;
  ImgSrc: string;
  isPopUp?: boolean;
  postId: number;
  createdAt: any;
};

const Post = ({
  name,
  src,
  likes,
  comment,
  ImgSrc,
  isPopUp,
  postId,
  createdAt,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDIsLiked, setDisIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const likePost = trpc.likePost.useMutation();
  const dislikePost = trpc.dislikePost.useMutation();
  const savePost = trpc.savePost.useMutation();

  const SavePost = () => {
    setIsSaved(!isSaved);
    if (isSaved) {
      savePost.mutate({ postId });
    }
  };
  const MessagePost = () => {};

  const LikePost = () => {
    setDisIsLiked(false);
    setIsLiked(!isLiked);

    if (isLiked) {
      likePost.mutate({ postId });
    }
  };

  const DisLikePost = () => {
    setIsLiked(false);
    setDisIsLiked(!isDIsLiked);

    if (isDIsLiked) {
      dislikePost.mutate({ postId });
    }
  };

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
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div>
          <h2 className="font-bold text-xl">{name}</h2>
          <span className="font-semibold text-gray-600">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
      <div
        className={`border ${
          isPopUp ? "h-[300px] " : "h-[500px] "
        } rounded-xl relative`}
      >
        <Image
          src={ImgSrc}
          alt={"user"}
          className="rounded-xl"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="w-full">
        <div className="w-full py-2 px-1 mb-1">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Heart
                size={28}
                color={isLiked ? "red" : "black"}
                fill={isLiked ? "red" : "white"}
                className="cursor-pointer"
                onClick={LikePost}
              />
              <MessageSquare
                size={28}
                className="cursor-pointer"
                onClick={MessagePost}
              />
              <ThumbsDown
                size={28}
                className="cursor-pointer"
                color={isDIsLiked ? "blue" : "black"}
                fill={isDIsLiked ? "blue" : "white"}
                onClick={DisLikePost}
              />
            </div>
            <Bookmark
              size={28}
              onClick={SavePost}
              color={isSaved ? "black" : "black"}
              fill={isSaved ? "black" : "white"}
            />
          </div>
          <div className="mt-1">{likes} likes</div>
        </div>
        <div>
          <span className="font-bold text-md mr-2">{name}</span>
          <span>{comment}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
