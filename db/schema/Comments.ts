import { relations, InferSelectModel } from "drizzle-orm";
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { Post } from "./post";
import { CommentRelation } from "./CommentsRelation";

export const Comment = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content"),
  authorId: text("author_id"),
  postId: integer("post_id"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt"),
  likes: integer("likes"),
  dislikes: integer("dislikes"),
  replytoId: integer("replytoId"),
});

export const CommentRelations = relations(Comment, ({ one, many }) => ({
  author: one(users, {
    fields: [Comment.authorId],
    references: [users.id],
  }),
  post: one(Post, {
    fields: [Comment.postId],
    references: [Post.id],
  }),
}));

export type FetchComment = InferSelectModel<typeof Comment>;
