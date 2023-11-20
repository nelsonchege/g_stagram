"use client";

import { useSession } from "next-auth/react";
import ThemeButton from "@/components/ThemeButton";

export default function Home() {
  const { data: session } = useSession();
  console.log("session: ", session);
  return (
    <div className="flex h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div style={{ height: "200vh" }}>Scrollable Content</div>
      </div>
      <div className="hidden lg:block w-[25%] h-screen border-l-2 border-yellow-400">
        Right Container
      </div>
    </div>
  );
}
