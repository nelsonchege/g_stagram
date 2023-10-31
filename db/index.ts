import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const client = postgres();
export const db: PostgresJsDatabase = drizzle(client);

migrate(db, { migrationsFolder: "drizzle" });
