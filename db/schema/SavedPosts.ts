import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  timestamp,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { Post } from "./post";

export const SavedPost = pgTable("saved_posts", {
  authorId: text("author_id"),
  postId: integer("post_id"),
  createdAt: timestamp("createdAt").defaultNow(),
});
