"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";

enum ProfileTab {
  POST = "POST",
  LIKED = "LIKED",
  SAVED = "SAVED",
}

type Props = {};

const Tabs = (props: Props) => {
  const [onTab, setOnTab] = useState<ProfileTab>(ProfileTab.LIKED);
  return (
    <div className="my-10 flex gap-20">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setOnTab(ProfileTab.POST)}
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
        onClick={() => setOnTab(ProfileTab.LIKED)}
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
        onClick={() => setOnTab(ProfileTab.SAVED)}
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
  );
};

export default Tabs;
