import {
  pgTable,
  integer,
  timestamp,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";

export const SavedPost = pgTable(
  "saved_posts",
  {
    authorId: text("author_id"),
    postId: integer("post_id"),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey(...[table.authorId, table.postId]), // Spread columns array
    };
  }
);
