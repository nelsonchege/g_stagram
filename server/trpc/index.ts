import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "./trpc";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { Post } from "@/db/schema/post";
import { asc, desc } from "drizzle-orm";
import { LikedPost } from "@/db/schema/LikedPosts";
import { DisLikedPost } from "@/db/schema/DislikedPost";
import { SavedPost } from "@/db/schema/SavedPosts";

export const appRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async () => {
    const fetchusers = await db.select().from(users);
    return fetchusers;
  }),
  getPosts: publicProcedure.query(async () => {
    const fetchPosts = await db.query.Post.findMany({
      with: {
        author: true,
      },
      orderBy: [desc(Post.createdAt)],
    });

    return fetchPosts;
  }),
  createPost: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        image: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const payload = { ...input, authorId: ctx.session.user.id };
      console.log("payload: ", payload);
      await db.insert(Post).values(payload);
      return true;
    }),
  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const payload = { ...input, authorId: ctx.session.user.id };
      await db.insert(LikedPost).values(payload);
      return true;
    }),
  dislikePost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const payload = { ...input, authorId: ctx.session.user.id };
      await db.insert(DisLikedPost).values(payload);
      return true;
    }),
  savePost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const payload = { ...input, authorId: ctx.session.user.id };
      await db.insert(SavedPost).values(payload);
      return true;
    }),
});

export type AppRouter = typeof appRouter;
