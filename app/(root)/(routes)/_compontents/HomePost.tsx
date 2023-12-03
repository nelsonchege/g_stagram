"use client";

import React, { useEffect, useMemo, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import Post from "@/components/Post";

const HomePost = () => {
  const { data: initialPosts } = trpc.getPosts.useQuery({
    category: "general",
    type: "object",
  });
  const { data: initialLikes } = trpc.getLikedDislikedAndSaved.useQuery();

  const [Posts, setPosts] = useState(initialPosts);
  const [Likes, setLikes] = useState(initialLikes);

  const memoizedPosts = useMemo(() => initialPosts, [initialPosts]);
  const memoizedLikes = useMemo(() => initialLikes, [initialLikes]);

  useEffect(() => {
    setPosts(memoizedPosts);
    setLikes(memoizedLikes);
  }, [memoizedPosts, memoizedLikes]);

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
    <>
      {Posts ? (
        <>
          {/* @ts-ignore */}
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
              createdAt={post.createdAt}
              postId={post.id}
              liked={getliked(post.id, "LIKED") || false}
              disliked={getliked(post.id, "DISLIKED") || false}
              saved={getliked(post.id, "SAVED") || false}
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
