import { pgTable, integer, timestamp, text } from "drizzle-orm/pg-core";

export const LikedPost = pgTable("liked_posts", {
  authorId: text("author_id"),
  postId: integer("post_id"),
  createdAt: timestamp("createdAt").defaultNow(),
});
