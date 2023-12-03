"use client";

import { Bookmark, Heart, MessageSquare, ThumbsDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { trpc } from "@/app/_trpc/client";

type PostProps = {
  name: string;
  src: string;
  likes: number;
  comment: string;
  ImgSrc: string;
  isPopUp?: boolean;
  createdAt: any;
  postId: number;
  liked: boolean;
  disliked: boolean;
  saved: boolean;
};

const Post = ({
  name,
  src,
  likes,
  comment,
  ImgSrc,
  isPopUp,
  createdAt,
  postId,
  liked,
  disliked,
  saved,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [isDIsLiked, setIsDisLiked] = useState<boolean>(disliked);
  const [isSaved, setIsSaved] = useState<boolean>(saved);

  const likePost = trpc.likePost.useMutation();
  const dislikePost = trpc.dislikePost.useMutation();
  const savePost = trpc.savePost.useMutation();

  const MessagePost = async (postId: number) => {
    console.log("write comment", postId);
  };
  const SavePost = async (postId: number) => {
    if (!isSaved) {
      setIsSaved(!isSaved);
      savePost.mutate({ postId, category: "SAVE" });
    } else {
      setIsSaved(!isSaved);
      savePost.mutate({ postId, category: "UNSAVE" });
    }
  };
  const LikePost = async (postId: number) => {
    if (!isLiked) {
      //if someone has disliked the post
      if (isDIsLiked) {
        //first delete the dislike
        setIsDisLiked(!isDIsLiked);
        dislikePost.mutate({ postId, category: "UNDISLIKE" });
      }
      setIsLiked(!isLiked);
      likePost.mutate({ postId, category: "LIKE" });
    } else {
      setIsLiked(!isLiked);
      likePost.mutate({ postId, category: "UNLIKE" });
    }
  };
  const DisLikePost = async (postId: number) => {
    if (!isDIsLiked) {
      //if someone has liked the post
      if (isLiked) {
        //first delete the like
        setIsLiked(!isLiked);
        likePost.mutate({ postId, category: "UNLIKE" });
      }
      setIsDisLiked(!isDIsLiked);
      dislikePost.mutate({ postId, category: "DISLIKE" });
    } else {
      setIsDisLiked(!isDIsLiked);
      dislikePost.mutate({ postId, category: "UNDISLIKE" });
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
                onClick={() => LikePost(postId)}
              />
              <MessageSquare
                size={28}
                className="cursor-pointer"
                onClick={() => MessagePost(postId)}
              />
              <ThumbsDown
                size={28}
                className="cursor-pointer"
                color={isDIsLiked ? "blue" : "black"}
                fill={isDIsLiked ? "blue" : "white"}
                onClick={() => DisLikePost(postId)}
              />
            </div>
            <Bookmark
              size={28}
              className="cursor-pointer"
              onClick={() => SavePost(postId)}
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
