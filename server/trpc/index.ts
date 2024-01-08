import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "./trpc";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { Post } from "@/db/schema/post";
import { desc, eq, sql } from "drizzle-orm";
import { LikedPost } from "@/db/schema/LikedPosts";
import { DisLikedPost } from "@/db/schema/DislikedPost";
import { SavedPost } from "@/db/schema/SavedPosts";
import { Comment, FetchComment } from "@/db/schema/Comments";
import { PostWithAuthor } from "@/app/(root)/(routes)/profile/_components/Tabs";
import { CommentRelation } from "@/db/schema/CommentsRelation";

export const appRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async () => {
    const fetchusers = await db.select().from(users);
    return fetchusers;
  }),
  getPosts: protectedProcedure
    .input(z.object({ category: z.string(), type: z.string() }))
    .query(async ({ input, ctx }) => {
      if (input.category == "general") {
        const fetchPosts: PostWithAuthor[] = await db.query.Post.findMany({
          with: {
            author: true,
          },
          orderBy: [desc(Post.createdAt)],
        });
        return fetchPosts;
      } else if (input.category == "personal") {
        const fetchPosts = await db.query.Post.findMany({
          with: {
            author: true,
          },
          orderBy: [desc(Post.createdAt)],
          where: sql`${Post.authorId} = ${ctx.session?.user.id}`,
        });

        if (input.type === "length") {
          return fetchPosts.length;
        } else {
          return fetchPosts;
        }
      }
    }),
  getLikedPost: protectedProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      const likedPost = await db
        .select({ postId: LikedPost.postId })
        .from(LikedPost)
        .where(sql`${LikedPost.authorId} = ${ctx.session.user.id}`);

      if (input == "length") {
        return likedPost.length;
      } else {
        if (likedPost.length < 1) {
          return undefined;
        }
        let likedList: number[] = [];
        likedPost.map((post) => likedList.push(post.postId!));

        const fetchPosts = await db.query.Post.findMany({
          where: (posts, { inArray }) => inArray(posts.id, likedList),
          with: {
            author: true,
          },
          orderBy: [desc(Post.createdAt)],
        });
        return fetchPosts;
      }
    }),
  getSavedPost: protectedProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      const savedPost = await db
        .select({ postId: SavedPost.postId })
        .from(SavedPost)
        .where(sql`${SavedPost.authorId} = ${ctx.session.user.id}`);

      if (input == "length") {
        return savedPost.length;
      } else {
        if (savedPost.length < 1) {
          return undefined;
        }
        let savedList: number[] = [];
        savedPost.map((post) => savedList.push(post.postId!));

        const fetchPosts = await db.query.Post.findMany({
          where: (posts, { inArray }) => inArray(posts.id, savedList),
          with: {
            author: true,
          },
          orderBy: [desc(Post.createdAt)],
        });
        return fetchPosts;
      }
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
          .update(Post)
          .set({ likes: sql`${Post.likes} - 1` })
          .where(eq(Post.id, input.postId));
        await db
          .delete(LikedPost)
          .where(
            sql`${LikedPost.postId} = ${input.postId} and  ${LikedPost.authorId} = ${ctx.session.user.id}`
          );
        return;
      } else if (input.category === "LIKE") {
        await db
          .update(Post)
          .set({ likes: sql`${Post.likes} + 1` })
          .where(eq(Post.id, input.postId));
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
          .update(Post)
          .set({ likes: sql`${Post.dislikes} - 1` })
          .where(eq(Post.id, input.postId));
        await db
          .delete(DisLikedPost)
          .where(
            sql`${DisLikedPost.postId} = ${input.postId} and  ${DisLikedPost.authorId} = ${ctx.session.user.id}`
          );
        return;
      } else if (input.category === "DISLIKE") {
        await db
          .update(Post)
          .set({ likes: sql`${Post.dislikes} + 1` })
          .where(eq(Post.id, input.postId));
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

      return true;
    }),
  saveComment: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        content: z.string(),
        commentId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let payload;
      if (input.commentId) {
        payload = {
          authorId: ctx.session.user.id,
          content: input.content,
          replytoId: input.commentId,
        };
      } else {
        payload = {
          postId: input.postId,
          authorId: ctx.session.user.id,
          content: input.content,
        };
      }

      const returnedId: { ID: number }[] = await db
        .insert(Comment)
        .values(payload)
        .returning({ ID: Comment.id });

      if (input.commentId) {
        await db
          .insert(CommentRelation)
          .values({ parentId: input.commentId, ChildId: returnedId[0].ID });
      }

      return true;
    }),
  getComments: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const fetchComments = await db.query.Comment.findMany({
        with: {
          author: true,
        },
        where: eq(Comment.postId, input.postId),
      });

      return fetchComments;
    }),
  getCommentComments: protectedProcedure
    .input(z.object({ commentId: z.number() }))
    .query(async ({ input }) => {
      const CommentComments = await db.execute<FetchComment>(sql`
      select * from ${Comment}
      where id in (
        select ${CommentRelation.ChildId}
        from ${CommentRelation}
        where ${CommentRelation.parentId} = ${input.commentId}
      )`);

      let responseData: FetchComment[] = CommentComments.rows;
      return responseData;
    }),
  getSuggestedUsers: protectedProcedure.query(async ({ ctx }) => {
    const fetchusers = await db
      .select()
      .from(users)
      .where(sql`${users.id} <> ${ctx.session.user.id}`)
      .limit(5);
    return fetchusers;
  }),
});

export type AppRouter = typeof appRouter;
