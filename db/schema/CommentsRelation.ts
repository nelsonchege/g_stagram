import { pgTable, serial, integer } from "drizzle-orm/pg-core";

export const CommentRelation = pgTable("comments_relation", {
  id: serial("id").primaryKey(),
  parentId: integer("parent_id"),
  ChildId: integer("child_id"),
});
