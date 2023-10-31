import { pgTable, varchar, text } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const users = pgTable("users", {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(uuidv4),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
});
