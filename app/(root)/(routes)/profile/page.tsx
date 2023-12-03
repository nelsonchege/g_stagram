import ExplorePost from "@/components/ExplorePost";
import React from "react";
import Tabs from "./_components/Tabs";
import Bio from "./_components/Bio";
import { getServerAuthSession } from "@/server/auth/authOptions";

const ProfilePage = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div className="min-h-screen  flex flex-col items-center py-10">
          <Bio
            src={session!.user.image}
            username={session?.user.name ? session.user.name : "random name"}
          />
          {/* for navigating to the different pages */}
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
