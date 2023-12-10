"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import CommentInput from "./CommentInput";
import { trpc } from "@/app/_trpc/client";

type PostCommentProps = {
  src: string;
  comment: any;
  postId: number;
};

const PostComment = ({ src, comment, postId }: PostCommentProps) => {
  const [addComment, setAddComment] = useState<boolean>(false);
  const [showMoreComment, setShowMoreComment] = useState<boolean>(false);
  const { data: initialCommentComments } = trpc.getCommentComments.useQuery({
    commentId: comment.id,
  });
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
          postId={postId}
          className={`${addComment ? "block" : "hidden"}`}
          commentId={comment.id}
        />
        {initialCommentComments!.length ? (
          <>
            <span
              className="text-lg cursor-pointer"
              onClick={() => setShowMoreComment(!showMoreComment)}
            >
              --view comments ({initialCommentComments?.length})
            </span>
            <div className={`${showMoreComment ? "block" : "hidden"}`}>
              <div className="ml-5 flex flex-col ">
                {initialCommentComments!.map((Comments) => (
                  <span key={Comments.id + comment.id}>{Comments.content}</span>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PostComment;
