"use client";

import { useSession } from "next-auth/react";
import ThemeButton from "@/components/ThemeButton";

export default function Home() {
  const { data: session } = useSession();
  console.log("session: ", session);
  return (
    <div className="p-10">
      <ThemeButton />
    </div>
  );
}
