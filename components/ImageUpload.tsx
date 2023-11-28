"use client";

import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "./ui/button";
import Image from "next/image";

type FileUploaderProps = {
  fieldChange: (filesUrl: string) => void;
};

const ImageUpload = ({ fieldChange }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>("");

  return (
    <div className="h-[30rem] border border-secondary bg-secondary">
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full h-[85%] p-5 lg:p-10 relative mb-2">
            <Image
              src={fileUrl}
              alt="image"
              className="rounded-lg"
              fill
              sizes="100vw"
              style={{
                objectFit: "center"
              }} />
          </div>
          {/* @ts-ignore */}
          <UploadButton<OurFileRouter>
            className="bg-background"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setFileUrl(res[0].url);
              fieldChange(res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onBeforeUploadBegin={(files) => {
              return files.map(
                (f) => new File([f], "renamed-" + f.name, { type: f.type })
              );
            }}
            onUploadBegin={(name) => {
              console.log("Uploading: ", name);
            }}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Image
            src="./file-upload.svg"
            width={77}
            height={77}
            priority
            alt="file upload"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          {/* @ts-ignore */}
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res[0]);
              setFileUrl(res[0].url);
              fieldChange(res[0].url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            onBeforeUploadBegin={(files) => {
              return files.map(
                (f) => new File([f], "renamed-" + f.name, { type: f.type })
              );
            }}
            onUploadBegin={(name) => {
              console.log("Uploading: ", name);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
