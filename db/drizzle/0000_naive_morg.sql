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
CREATE TABLE IF NOT EXISTS "disliked_posts" (
	"author_id" text,
	"post_id" integer,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT disliked_posts_author_id_post_id PRIMARY KEY("author_id","post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "liked_posts" (
	"author_id" text,
	"post_id" integer,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT liked_posts_author_id_post_id PRIMARY KEY("author_id","post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" text,
	"content" text,
	"location" text,
	"image" text,
	"likes" integer DEFAULT 0,
	"dislikes" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saved_posts" (
	"author_id" text,
	"post_id" integer,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT saved_posts_author_id_post_id PRIMARY KEY("author_id","post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp DEFAULT now(),
	"image" text,
	"bio" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
