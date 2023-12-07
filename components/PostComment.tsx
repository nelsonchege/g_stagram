import React from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
type PostCommentProps = {
  src: string;
};

const PostComment = ({ src }: PostCommentProps) => {
  return (
    <div className="p-2 w-full flex gap-2">
      <div>
        <Image
          src={src}
          alt={"image"}
          width={50}
          height={50}
          className="rounded-full border-2 "
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex gap-3">
          <h1 className="font-semibold text-lg">comments name</h1>
          <span className="text-lg">actual comment</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">reply</span>
          <MoreHorizontal />
        </div>
        <span className="text-lg">--view comments (1)</span>
      </div>
    </div>
  );
};

export default PostComment;
