"use client";

import ThemeButton from "@/components/ThemeButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "./_trpc/client";
import { useState } from "react";

export default function Home() {
  const getUsers = trpc.getUsers.useQuery();
  const addUser = trpc.addUser.useMutation();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  return (
    <div className="p-10">
      <ThemeButton />
      <div className="flex justify-center">{JSON.stringify(getUsers.data)}</div>
      <div className="flex flex-col items-center gap-5">
        <div className="flex justify-center gap-5">
          <div className="flex w-full max-w-sm items-center space-x-2 ">
            <Input
              type="text"
              placeholder="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={async () => {
            addUser.mutate({ firstName, lastName });
          }}
          className="w-[15%]"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
