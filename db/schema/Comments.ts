import { relations } from "drizzle-orm";
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { Post } from "./post";

export const Comment = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content"),
  authorId: integer("author_id"),
  postId: integer("post_id"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt"),
  likes: integer("likes"),
  dislikes: integer("dislikes"),
  replytoId: integer("replytoId"),
});

export const CommentRelations = relations(Comment, ({ one }) => ({
  author: one(users, {
    fields: [Comment.authorId],
    references: [users.id],
  }),
  post: one(Post, {
    fields: [Comment.postId],
    references: [Post.id],
  }),
}));
