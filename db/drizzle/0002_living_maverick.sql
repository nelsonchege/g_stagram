CREATE TABLE IF NOT EXISTS "saved_posts" (
	"author_id" text,
	"post_id" integer,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "likes" integer;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "dislikes" integer;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "post_id";