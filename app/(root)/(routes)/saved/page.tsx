"use client";

import { trpc } from "@/app/_trpc/client";
import ExplorePost from "@/components/ExplorePost";
import React, { useEffect, useMemo, useState } from "react";

const SavedPage = () => {
  const { data: initialSavedPosts } = trpc.getSavedPost.useQuery();
  const [Posts, setPosts] = useState(initialSavedPosts);
  const memoizedSavedPosts = useMemo(
    () => initialSavedPosts,
    [initialSavedPosts]
  );

  useEffect(() => {
    setPosts(memoizedSavedPosts);
  }, [memoizedSavedPosts]);

  return (
    <div className="flex h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div className=" p-5 sm:p-20 min-h-screen">
          <h1 className="font-bold text-4xl mb-10">Saved</h1>

          <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {!Posts ? (
              <div className="font-semibold text-2xl">
                <span> You have no Saved posts</span>
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

export default SavedPage;
