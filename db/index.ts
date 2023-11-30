import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import { Post, postsRelations } from "./schema/post";
import { users } from "./schema/users";
import { SavedPost } from "./schema/SavedPosts";
import { CommentRelation } from "./schema/CommentsRelation";
import { Comment } from "./schema/Comments";
dotenv.config();

const client = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(client, {
  schema: { Post, users, SavedPost, CommentRelation, Comment, postsRelations },
});
