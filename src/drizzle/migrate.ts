import { migrate } from "drizzle-orm/node-postgres/migrator";
import { connectDb } from "../config/database";

const runMigrations = async () => {
  const db = connectDb;
  await migrate(db, { migrationsFolder: "./migrations" });
};

runMigrations()
  .catch(console.error)
  .finally(() => process.exit());
