"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/legacy/image";
import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Icons } from "@/components/icons";

const SignInPage = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Card
          isBlurred
          className="border-2 rounded-xl shadow-md border-gray-200 dark:border-gray-700 bg-secondary/30 dark:bg-default-100/50 w-[90%] sm:w-2/3 p-4 h-2/3"
          shadow="md"
        >
          <CardBody className="overflow-visible p-0 h-28 md:h-40 flex justify-end items-center">
            <h1 style={{ fontFamily: "Billabong" }} className=" text-7xl">
              gstagram
            </h1>
          </CardBody>
          <CardFooter className="flex flex-col mt-10 md:mt-28 gap-5 p-5">
            <span className="text-xl"> Log in to your account</span>
            <Button
              className="w-2/3 h-12 "
              size={"lg"}
              onClick={() => signIn("google")}
            >
              <span className="my-5 text-xl">sign in with google</span>
              <Icons.google className="h-4 w-4 ml-3 " />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src={"/side-img.svg"}
          layout="fill"
          objectFit="contain"
          alt={"hello instagram"}
          className=""
        />
      </div>
    </div>
  );
};

export default SignInPage;
