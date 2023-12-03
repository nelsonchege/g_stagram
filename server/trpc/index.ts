import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "./trpc";
import { db } from "@/db";
import { FetchUsers, users } from "@/db/schema/users";
import { FetchPost, Post } from "@/db/schema/post";
import { asc, desc, sql } from "drizzle-orm";
import { LikedPost } from "@/db/schema/LikedPosts";
import { DisLikedPost } from "@/db/schema/DislikedPost";
import { SavedPost } from "@/db/schema/SavedPosts";

export type PostWithAuthor = FetchPost & {
  author: FetchUsers;
};

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
  getLikedDislikedAndSaved: protectedProcedure.query(async ({ ctx }) => {
    const liked_posts = await db
      .select()
      .from(LikedPost)
      .where(sql`${LikedPost.authorId} = ${ctx.session.user.id}`);
    const disliked_posts = await db
      .select()
      .from(DisLikedPost)
      .where(sql`${DisLikedPost.authorId} = ${ctx.session.user.id}`);
    const saved_posts = await db
      .select()
      .from(SavedPost)
      .where(sql`${SavedPost.authorId} = ${ctx.session.user.id}`);

    const returnedData = { liked_posts, disliked_posts, saved_posts };

    return returnedData;
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
        category: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.category === "UNLIKE") {
        await db
          .delete(LikedPost)
          .where(
            sql`${LikedPost.postId} = ${input.postId} and  ${LikedPost.authorId} = ${ctx.session.user.id}`
          );
        return;
      } else if (input.category === "LIKE") {
        const payload = { postId: input.postId, authorId: ctx.session.user.id };
        await db.insert(LikedPost).values(payload);
        return;
      }
    }),
  dislikePost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        category: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.category === "UNDISLIKE") {
        await db
          .delete(DisLikedPost)
          .where(
            sql`${DisLikedPost.postId} = ${input.postId} and  ${DisLikedPost.authorId} = ${ctx.session.user.id}`
          );
        return;
      } else if (input.category === "DISLIKE") {
        const payload = { postId: input.postId, authorId: ctx.session.user.id };
        await db.insert(DisLikedPost).values(payload);
        return;
      }
    }),
  savePost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        category: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.category === "UNSAVE") {
        await db
          .delete(SavedPost)
          .where(
            sql`${SavedPost.postId} = ${input.postId} and  ${SavedPost.authorId} = ${ctx.session.user.id}`
          );
        return;
      } else if (input.category === "SAVE") {
        const payload = { postId: input.postId, authorId: ctx.session.user.id };
        await db.insert(SavedPost).values(payload);
        return;
      }
    }),
  fetchLikedPost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const subquery = db
        .select({ n: sql`1` })
        .from(LikedPost)
        .where(
          sql`${LikedPost.postId} = ${input.postId} and ${LikedPost.authorId} = ${ctx.session.user.id}`
        );

      const result = await db.execute<{ exists: boolean }>(
        sql`select exists(${subquery}) as exists`
      );

      console.log("fetching like: ", result.rows);
      return true;
    }),
});

export type AppRouter = typeof appRouter;
