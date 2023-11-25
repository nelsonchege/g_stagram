import ExplorePost from "@/components/ExplorePost";
import React from "react";
import Tabs from "./_components/Tabs";
import Bio from "./_components/Bio";

const ProfilePage = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div className="min-h-screen  flex flex-col items-center py-10">
          <Bio />
          {/* for navigating to the different pages */}
          <Tabs />
          {/* contains all the different images */}
          <div className="w-[85%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1698961688734-6cee0e82b19c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1700630218434-58d96acec155?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1661240794784-ca1cb2008b6f?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://plus.unsplash.com/premium_photo-1700081738537-2d3f120c7788?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <ExplorePost
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d)"}
              bgSrc={
                "https://images.unsplash.com/photo-1682685797498-3bad2c6e161a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
