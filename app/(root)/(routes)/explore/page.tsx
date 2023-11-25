import CategoryItem from "@/components/CategoryItem";
import ExplorePost from "@/components/ExplorePost";
import React from "react";

const ExplorePage = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div className=" p-5 sm:p-20 min-h-screen">
          <h1 className="font-bold text-4xl mb-10">Explore Page</h1>
          <div className="border border-gray-300 dark:border-gray-500 p-5 my-5 rounded-xl hover:shadow-md">
            Search
          </div>
          <div className=" my-5 flex gap-4 justify-center">
            <CategoryItem name="travel" />
            <CategoryItem name="travel" />
            <CategoryItem name="travel & restaurant" />
            <CategoryItem name="travel" />
            <CategoryItem name="travel" />
            <CategoryItem name="travel" />
            <CategoryItem name="travel" />
          </div>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1700493624674-ba1d0ec73595?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1700176354301-a213bbd840c9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1700194127354-436405b4aa71?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1700234272537-216c4079353f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzF8fHxlbnwwfHx8fHw%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1683009680116-b5c04463551d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1700403322210-074c3a084b50?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1683009680116-b5c04463551d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1700403322210-074c3a084b50?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
