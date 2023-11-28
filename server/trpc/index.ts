import { z } from "zod";
import { publicProcedure, protectedProcedure, createTRPCRouter } from "./trpc";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { Post } from "@/db/schema/post";

export const appRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async () => {
    console.log("at trpc procedure");

    const fetchusers = await db.select().from(users);
    return fetchusers;
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
});

export type AppRouter = typeof appRouter;
