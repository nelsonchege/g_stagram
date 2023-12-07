"use client";

import { trpc } from "@/app/_trpc/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type CommentInputProps = {
  postId: number;
};

const CommentInput = ({ postId }: CommentInputProps) => {
  const [comment, setComment] = useState<string | undefined>(undefined);
  const SaveComment = trpc.saveComment.useMutation();

  const SubmitComment = () => {
    console.log(` comment: ${comment},postId: ${postId}`);
    SaveComment.mutate({ postId, content: comment! });
  };
  return (
    <div className="py-2 flex gap-3">
      <input
        placeholder="add comment"
        className="p-2.5 flex-1 bg-gray-50 border border-gray-100  rounded-md"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        className={`${comment ? "block" : "hidden"}`}
        onClick={SubmitComment}
      >
        post
      </button>
    </div>
  );
};

export default CommentInput;
