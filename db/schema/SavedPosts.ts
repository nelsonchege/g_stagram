import { pgTable, integer, timestamp, text } from "drizzle-orm/pg-core";

export const SavedPost = pgTable("saved_posts", {
  authorId: text("author_id"),
  postId: integer("post_id"),
  createdAt: timestamp("createdAt").defaultNow(),
});
