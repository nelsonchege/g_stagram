"use client";

import ThemeButton from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "./_trpc/client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const getUsers = trpc.getUsers.useQuery();
  const addUser = trpc.addUser.useMutation({
    onSettled: () => {
      getUsers.refetch();
    },
  });

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  return (
    <div className="p-10">
      <ThemeButton />
      <div className="flex justify-center">{JSON.stringify(getUsers.data)}</div>
      <div className="flex flex-col items-center gap-5">
        <div className="flex justify-center gap-5">
          <div className="flex w-full max-w-sm items-center space-x-2 ">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={async () => {
            addUser.mutate({ name, email, id: uuidv4() });
          }}
          className="w-[15%]"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
