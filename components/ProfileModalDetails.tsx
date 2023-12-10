"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Post from "./Post";
import { Bookmark, Heart, MessageSquare, ThumbsDown } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { PostWithAuthor } from "@/app/(root)/(routes)/profile/_components/Tabs";
import PostComment from "./PostComment";
import CommentInput from "./CommentInput";

type ProfileModalDetailsProps = {
  src: string;
  bgSrc: string;
  PostDetails: PostWithAuthor;
};

const ProfileModalDetails = ({
  src,
  bgSrc,
  PostDetails,
}: ProfileModalDetailsProps) => {
  const { data: initialLikes } = trpc.getLikedDislikedAndSaved.useQuery();
  const { data: initialComments } = trpc.getComments.useQuery(
    {
      postId: PostDetails.id,
    },
    {
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
  const memoizedLikes = useMemo(() => initialLikes, [initialLikes]);
  const memoizedComments = useMemo(() => initialComments, [initialComments]);
  const [Comments, setComments] = useState(initialComments);
  const [Likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    setLikes(memoizedLikes);
    setComments(memoizedComments);
  }, [memoizedLikes, memoizedComments]);

  const getliked = (PostId: number, category: string) => {
    if (Likes == undefined) {
      return false;
    }
    if (category == "LIKED") {
      const likes = Likes!["liked_posts"];
      return likes.some((item) => item.postId === PostId);
    } else if (category == "DISLIKED") {
      const likes = Likes!["disliked_posts"];
      return likes.some((item) => item.postId === PostId);
    } else if (category == "SAVED") {
      const likes = Likes!["saved_posts"];

      const response = likes.some((item) => item.postId === PostId);
      console.log("response: ", response);
      return response;
    }
  };

  return (
    <div className="w-[90%] lg:w-2/3 h-[81%] lg:h-3/4 bg-background border-2 bg-opacity-100 mx-auto my-auto rounded-xl shadow-lg flex flex-col lg:flex-row gap-3">
      <div className="hidden sm:block w-full lg:w-1/2  relative ">
        <Image
          src={bgSrc}
          alt={"image"}
          className="rounded-xl"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="hidden  w-full lg:w-1/2 lg:flex md:flex-col">
        <div className="h-20 border-b-2 flex justify-between items-center pl-5 gap-5 ">
          <div className="flex items-center gap-3">
            <Image
              src={src}
              alt={"image"}
              width={60}
              height={60}
              className="rounded-full border-2 "
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <div>{PostDetails.author?.name}</div>
          </div>

          <div className="mr-5">follow</div>
        </div>
        <div className="">
          <div className="flex flex-grow">
            <ScrollArea className="h-[425px] w-full overflow-y-auto border-none">
              <div className="h-[425px] flex justify-center ">
                {Comments?.length ? (
                  <div className="flex flex-col w-full border m-2">
                    {Comments.map((comment) => (
                      <PostComment
                        src={src}
                        key={comment.id}
                        comment={comment}
                        postId={PostDetails.id}
                      />
                    ))}
                  </div>
                ) : (
                  <h4 className="mb-4 text-xl font-bold leading-none">
                    NO Comments
                  </h4>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        {/* comment section */}
        <div className="w-full p-4 border ">
          <div className="w-full py-2 px-1 mb-1 border ">
            <div className="flex justify-between ">
              <div className="flex gap-2">
                <Heart size={28} />
                <MessageSquare size={28} />
                <ThumbsDown size={28} />
              </div>
              <Bookmark size={28} />
            </div>
            <div className="mt-1">{PostDetails.likes} likes</div>
          </div>
          <div>
            <span className="font-bold text-md mr-3">
              {PostDetails.author?.name}
            </span>
            <span className="text-md">{PostDetails.content}</span>
          </div>
          <CommentInput postId={PostDetails.id} />
        </div>
      </div>
      <div className="lg:hidden flex justify-center items-center mb-5">
        <Post
          name={PostDetails.author!.name!}
          src={src}
          likes={PostDetails.likes ? PostDetails.likes : 0}
          comment={PostDetails.content!}
          ImgSrc={bgSrc}
          isPopUp={false}
          createdAt={PostDetails.createdAt}
          postId={PostDetails.id}
          liked={getliked(PostDetails.id, "LIKED") || false}
          disliked={getliked(PostDetails.id, "DISLIKED") || false}
          saved={getliked(PostDetails.id, "SAVED") || false}
        />
      </div>
    </div>
  );
};

export default ProfileModalDetails;
