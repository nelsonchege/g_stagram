"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import ExplorePost from "@/components/ExplorePost";
import { trpc } from "@/app/_trpc/client";

enum ProfileTab {
  POST = "POST",
  LIKED = "LIKED",
  SAVED = "SAVED",
}

const Tabs = () => {
  const [onTab, setOnTab] = useState<ProfileTab>(ProfileTab.POST);

  const { data: initialPosts } = trpc.getPosts.useQuery({
    category: "personal",
    type: "object",
  });
  const { data: initialLIkedPosts } = trpc.getLikedPost.useQuery();
  const { data: initialSavedPosts } = trpc.getSavedPost.useQuery();

  const [Posts, setPosts] = useState(initialPosts);
  console.log("users post: ", Posts);
  const memoizedPosts = useMemo(() => initialPosts, [initialPosts]);
  const memoizedLIkedPosts = useMemo(
    () => initialLIkedPosts,
    [initialLIkedPosts]
  );
  const memoizedSavedPosts = useMemo(
    () => initialSavedPosts,
    [initialSavedPosts]
  );

  useEffect(() => {
    setPosts(memoizedPosts);
  }, [memoizedPosts]);

  const MoveToPost = () => {
    setOnTab(ProfileTab.POST);
    setPosts(memoizedPosts);
  };
  const MoveToLiked = () => {
    setOnTab(ProfileTab.LIKED);
    setPosts(memoizedLIkedPosts);
  };
  const MoveToSaved = () => {
    setOnTab(ProfileTab.SAVED);
    setPosts(memoizedSavedPosts);
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="my-10 flex gap-20">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={MoveToPost}
        >
          <Separator
            className={`${
              onTab === ProfileTab.POST ? "bg-black h-1" : "text-stone-400 h-0"
            }   w-20`}
          />
          <h1
            className={`${
              onTab === ProfileTab.POST ? "text-black" : "text-stone-400"
            } text-xl font-semibold`}
          >
            post
          </h1>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={MoveToLiked}
        >
          <Separator
            className={`${
              onTab === ProfileTab.LIKED ? "bg-black h-1" : "text-stone-400 h-0"
            }   w-20`}
          />
          <h1
            className={`${
              onTab === ProfileTab.LIKED ? "text-black" : "text-stone-400"
            } text-xl font-semibold`}
          >
            liked
          </h1>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={MoveToSaved}
        >
          <Separator
            className={`${
              onTab === ProfileTab.SAVED ? "bg-black h-1" : "text-stone-400 h-0"
            }   w-20`}
          />
          <h1
            className={`${
              onTab === ProfileTab.SAVED ? "text-black" : "text-stone-400"
            } text-xl font-semibold`}
          >
            Saved
          </h1>
        </div>
      </div>

      {/* contains all the different images */}
      <div className="w-[85%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!Posts ? (
          <div className="font-semibold text-2xl">
            <span> You have no {onTab.toLowerCase()} posts</span>
          </div>
        ) : (
          <>
            {/* @ts-ignore */}
            {Posts.map((post) => (
              <ExplorePost
                PostDetails={post}
                src={
                  post.author?.image
                    ? post.author?.image
                    : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                }
                bgSrc={post.image!}
                key={post.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Tabs;
