CREATE TABLE IF NOT EXISTS "disliked_posts" (
	"author_id" text,
	"post_id" integer,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "liked_posts" (
	"author_id" text,
	"post_id" integer,
	"createdAt" timestamp DEFAULT now()
);
