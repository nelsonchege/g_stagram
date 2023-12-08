"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import CommentInput from "./CommentInput";

type PostCommentProps = {
  src: string;
  comment: any;
};

const PostComment = ({ src, comment }: PostCommentProps) => {
  const [addComment, setAddComment] = useState<boolean>(false);
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
          <h1 className="font-semibold text-lg">{comment.author.name}</h1>
          <span className="text-lg">{comment.content}</span>
        </div>

        <button
          className="flex items-center gap-2"
          onClick={() => setAddComment(!addComment)}
        >
          <span className="text-lg">reply</span>
          <MoreHorizontal />
        </button>
        <CommentInput
          postId={3}
          className={`${addComment ? "block" : "hidden"}`}
          commentId={comment.id}
        />
        {/* TODO  to show if there is extra comments */}
        {/* <span className="text-lg">--view comments (1)</span> */}
      </div>
    </div>
  );
};

export default PostComment;
