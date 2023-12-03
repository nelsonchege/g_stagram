"use client";

import { trpc } from "@/app/_trpc/client";
import CategoryItem from "@/components/CategoryItem";
import ExplorePost from "@/components/ExplorePost";
import React, { useEffect, useMemo, useState } from "react";

const ExplorePage = () => {
  const { data: initialPosts } = trpc.getPosts.useQuery({
    category: "general",
    type: "object",
  });

  const [Posts, setPosts] = useState(initialPosts);

  const memoizedPosts = useMemo(() => initialPosts, [initialPosts]);

  useEffect(() => {
    setPosts(memoizedPosts);
  }, [memoizedPosts]);

  return (
    <div className="flex h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div className=" p-5 sm:p-20 min-h-screen">
          <h1 className="font-bold text-4xl mb-10">Explore Page</h1>
          <div className="border border-gray-300 dark:border-gray-500 p-5 my-5 rounded-xl hover:shadow-md">
            Search
          </div>
          <div className=" my-5 flex gap-4 justify-center  overflow-x-auto p-3">
            <CategoryItem name="travel" />
            <CategoryItem name="travel" />
            <CategoryItem name="travel&nbsp;&&nbsp;restaurant" />
            <CategoryItem name="travel" />
            <CategoryItem name="travel" />
            <CategoryItem name="travel" />
            <CategoryItem name="travel" />
          </div>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {!Posts ? (
              <div className="font-semibold text-2xl">
                <span> You have no posts found</span>
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
      </div>
    </div>
  );
};

export default ExplorePage;
