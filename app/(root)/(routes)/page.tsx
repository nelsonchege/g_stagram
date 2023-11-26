"use client";

import { useSession } from "next-auth/react";
import SUggestedUser from "@/components/SUggestedUser";
import Post from "@/components/Post";

export default function Home() {
  const { data: session } = useSession();
  console.log("session: ", session);
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden">
        <div className="min-h-screen flex flex-col items-center">
          <h1 className="py-5 pl-10 font-extrabold text-4xl self-start">
            Home Feed
          </h1>

          <Post
            name={"Briano Roloff"}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            likes={0}
            comment={"nice pic"}
            ImgSrc={
              "https://images.unsplash.com/photo-1700468026406-7fc2687245ab?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <Post
            name={"Myrtice Rantoul"}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            likes={0}
            comment={"nice pic"}
            ImgSrc={
              "https://images.unsplash.com/photo-1700141933748-4635f57d694e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <Post
            name={"Livvie Kenaway"}
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            likes={0}
            comment={"nice pic"}
            ImgSrc={
              "https://images.unsplash.com/photo-1684974018418-4e752cedaa3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </div>
      </div>
      <div className="hidden lg:block w-[30%] h-screen p-5">
        <h2 className="font-semibold text-xl">Suggested for you </h2>
        <div className="w-full py-3 mt-5">
          <SUggestedUser
            comment={"followed by w_g"}
            name={"Briano Roloff"}
            src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
          />
          <SUggestedUser
            comment={"follows you"}
            name={"Myrtice Rantoul"}
            src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
          />
          <SUggestedUser
            comment={"followed by w_g"}
            name={"Livvie Kenaway"}
            src={"https://i.pravatar.cc/150?u=a04258a2462d826712d"}
          />
          <SUggestedUser
            comment={"follows you"}
            name={"Briggs McLagain"}
            src={"https://i.pravatar.cc/150?u=a04258114e29026708c"}
          />
        </div>
      </div>
    </div>
  );
}
