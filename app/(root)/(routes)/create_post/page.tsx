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

const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
});

const CreatePostPage = () => {
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: "",
      file: [],
      location: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PostValidation>) {
    console.log(values);
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
              name="file"
              render={({ field }) => (
                <FormItem className="w-[95%] sm:w-2/3">
                  <FormControl>
                    <ImageUpload
                      fieldChange={field.onChange}
                      mediaUrl={""}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem className="w-[95%] sm:w-2/3">
                  <FormLabel className="font-semibold text-md">
                    Add Caption
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-secondary"
                      placeholder="Enter your caption"
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
