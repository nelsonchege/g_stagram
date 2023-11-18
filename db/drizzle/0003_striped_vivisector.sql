CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"author_id" integer,
	"post_id" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"likes" integer,
	"dislikes" integer,
	"replytoId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments_relation" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"child_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer,
	"content" text,
	"image" text,
	"likes" integer,
	"dislikes" integer,
	"createdAt" timestamp DEFAULT now()
);
