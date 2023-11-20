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

export const SavedPost = pgTable(
  "posts",
  {
    authorId: text("author_id").references(() => users.id),
    postId: integer("post_id"),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.authorId, t.postId),
  })
);

export const SavedPostsRelations = relations(SavedPost, ({ many }) => ({
  author: many(users),
  posts: many(Post),
}));
