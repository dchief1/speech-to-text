import { client, connectDb } from "../config/database";
import { migrate } from "drizzle-orm/node-postgres/migrator";

(async () => {
  try {
    await client.connect();
    // console.log("Connected to DB 😊");

    // Run migrations on the database, skipping the ones already applied
    await migrate(connectDb, { migrationsFolder: "./drizzle" });
    console.log("Migrations applied successfully 🚀");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    // Close the connection
    await client.end();
    // console.log("Database connection closed 😊");
  }
})();
