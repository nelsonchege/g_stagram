import { TRPCError, initTRPC } from "@trpc/server";
import { getServerAuthSession } from "../auth/authOptions";
import { db } from "@/db";
import { type NextRequest } from "next/server";
import { ZodError } from "zod";

interface CreateContextOptions {
  headers: Headers;
}

export const createInnerTRPCContext = async ({
  headers,
}: CreateContextOptions) => {
  const session = await getServerAuthSession();

  return {
    session,
    headers,
    db,
  };
};

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  return await createInnerTRPCContext({
    headers: opts.req.headers,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
