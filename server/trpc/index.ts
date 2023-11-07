import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "./trpc";
import { db } from "@/db";
import { users } from "@/db/schema/users";

export const appRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async () => {
    console.log("at trpc procedure");

    const fetchusers = await db.select().from(users);
    return fetchusers;
  }),
  addUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        name: z.string(),
      })
    )
    .mutation(async (opts) => {
      await db.insert(users).values(opts.input);
      return true;
    }),
});

export type AppRouter = typeof appRouter;
