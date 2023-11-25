import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "nelson" };
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
