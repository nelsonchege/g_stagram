import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

async function main() {
  console.log("migrating started .........");
  await migrate(db, { migrationsFolder: "./db/drizzle" });
}

main()
  .then(() => console.log("migrating completed successfully .........🚀"))
  .catch((error) => {
    console.log("error while migrating: ", error);
  });
