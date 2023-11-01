import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { db } from "@/db";
import { users } from "@/db/schema/users";

export const appRouter = router({
  getUsers: publicProcedure.query(async () => {
    console.log("at trpc procedure");

    const fetchusers = await db.select().from(users);
    return fetchusers;
  }),
  addUser: publicProcedure
    .input(
      z.object({
        email: z.string().optional(),
        firstName: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async (opts) => {
      await db.insert(users).values(opts.input);
      return true;
    }),
});

export type AppRouter = typeof appRouter;
