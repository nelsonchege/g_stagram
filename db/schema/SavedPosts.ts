import { relations } from "drizzle-orm";
import { pgTable, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { Post } from "./post";

export const SavedPost = pgTable("posts", {
  authorId: integer("author_id"),
  postId: integer("post_id"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const SavedPostsRelations = relations(SavedPost, ({ many }) => ({
  author: many(users),
  posts: many(Post),
}));
