"use client";

import React from "react";
import { trpc } from "@/app/_trpc/client";
import Post from "@/components/Post";

const HomePost = () => {
  const { data: Posts } = trpc.getPosts.useQuery();
  return (
    <>
      {Posts ? (
        <>
          {Posts.map((post) => (
            <Post
              key={post.id}
              name={post.author!.name!}
              src={
                post.author?.image
                  ? post.author?.image
                  : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
              likes={post.likes ? post.likes : 0}
              comment={post.content!}
              ImgSrc={post.image!}
              postId={post.id}
              createdAt={post.createdAt}
            />
          ))}
        </>
      ) : (
        <p className="my-20 font-semibold text-2xl">No Posts available</p>
      )}
    </>
  );
};

export default HomePost;
