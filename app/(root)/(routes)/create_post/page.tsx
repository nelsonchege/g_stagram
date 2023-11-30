"use client";

import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import toast from "react-hot-toast";

const PostValidation = z.object({
  content: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  image: z.string(),
  location: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
});

const CreatePostPage = () => {
  const addPost = trpc.createPost.useMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      content: "",
      image: "",
      location: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PostValidation>) {
    try {
      const postingData = async (values: z.infer<typeof PostValidation>) => {
        await addPost.mutate(values);
      };
      toast.promise(postingData(values), {
        loading: "Loading",
        success: "posted successfully",
        error: "Error when fetching",
      });
      router.push("/");
    } catch (error) {
      toast.error("something went wrong");
      router.refresh();
    }
  }
  return (
    <div className="flex h-screen">
      <div className="flex-1  overflow-y-auto scrollbar-hidden p-10 flex flex-col items-center gap-5 mb-16 sm:mb-0">
        <div className="flex items-center gap-3 font-bold text-4xl self-start mb-10">
          <ImagePlus size={36} strokeWidth={3} />
          create post
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3 items-center"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-[95%] sm:w-2/3">
                  <FormControl>
                    <ImageUpload fieldChange={field.onChange} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-[95%] sm:w-2/3">
                  <FormLabel className="font-semibold text-md">
                    Add content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-secondary"
                      placeholder="Enter your content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-[95%] sm:w-2/3">
                  <FormLabel className="font-semibold text-md">
                    Add Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Where are you at"
                      className="bg-secondary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <div className="w-[95%] sm:w-2/3 flex justify-end gap-5 mt-5">
              <Button
                variant={"destructive"}
                className="h-12 font-bold text-xl"
                type="button"
                onClick={() => router.push("/")}
              >
                Discard
              </Button>
              <Button className="h-12 font-bold text-xl" type="submit">
                save
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* to be hidden */}
      <div className="hidden lg:block w-[25%] h-screen p-5 " />
    </div>
  );
};

export default CreatePostPage;
