import { pgTable, integer, timestamp, text } from "drizzle-orm/pg-core";

export const DisLikedPost = pgTable("disliked_posts", {
  authorId: text("author_id"),
  postId: integer("post_id"),
  createdAt: timestamp("createdAt").defaultNow(),
});
