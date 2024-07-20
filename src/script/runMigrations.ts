import config from "config/config";
import { connectDb } from "config/database";
import { runMigrations } from "drizzle-orm/migration";

runMigrations(config)
  .then(() => {
    console.log("Migrations reverted");
  })
  .catch((err) => {
    console.error("Revert migration failed", err);
  });
