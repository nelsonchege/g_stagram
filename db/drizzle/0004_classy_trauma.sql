ALTER TABLE "posts" ADD COLUMN "post_id" integer;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "content";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "image";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "likes";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "dislikes";