"use client";

import { trpc } from "@/app/_trpc/client";
import React, { useState } from "react";

type CommentInputProps = {
  postId: number;
  className?: string;
  commentId?: number | undefined;
};

const CommentInput = ({ postId, className, commentId }: CommentInputProps) => {
  const [comment, setComment] = useState<string | undefined>(undefined);
  const SaveComment = trpc.saveComment.useMutation();

  const SubmitComment = () => {
    let payload = {
      postId,
      content: comment!,
      commentId: undefined as number | undefined,
    };
    if (commentId) {
      payload.commentId = commentId;
    }
    SaveComment.mutate(payload);
    setComment("");
  };
  return (
    <div className={className}>
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
    </div>
  );
};

export default CommentInput;
