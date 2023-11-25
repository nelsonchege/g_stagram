"use client";

import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ImageUpload = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback(
      (acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(convertFileToUrl(acceptedFiles[0]));

        var formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        fetch("/uploadthing", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("here is the error", error));
      },
      [file]
    ),
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="h-[30rem] border border-secondary bg-secondary"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full h-[90%] p-5 lg:p-10 relative">
            <Image
              src={fileUrl}
              alt="image"
              layout="fill"
              objectFit="center"
              className="rounded-lg"
            />
          </div>
          <p className="text-center text-[14px] font-normal leading-[140%] w-full p-4 border-t">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Image
            src="./file-upload.svg"
            width={77}
            height={77}
            priority
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button
            type="button"
            className="bg-background border-2 text-primary shadow-md hover:bg-background hover:shadow-xl"
          >
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
