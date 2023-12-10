import {
  pgTable,
  serial,
  integer,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";

export const CommentRelation = pgTable(
  "comments_relation",
  {
    parentId: integer("parent_id"),
    ChildId: integer("child_id"),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey(...[table.parentId, table.ChildId]), // Spread columns array
    };
  }
);
