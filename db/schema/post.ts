import { relations } from "drizzle-orm";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const Post = pgTable("posts", {
  id: serial("id").primaryKey(),
  authorId: text("author_id"),
  content: text("content"),
  location: text("location"),
  image: text("image"),
  likes: integer("likes"),
  dislikes: integer("dislikes"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const postsRelations = relations(Post, ({ one }) => ({
  author: one(users, {
    fields: [Post.authorId],
    references: [users.id],
  }),
}));

export type NewPost = InferInsertModel<typeof Post>;
export type FetchPost = InferSelectModel<typeof Post>;
