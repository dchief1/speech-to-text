import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import configs from "../config/config";

const pool = new Pool({
  host: configs.PG_HOST,
  port: parseInt(configs.PG_PORT || "5432"),
  database: configs.PG_DATABASE,
  user: configs.PG_USER,
  password: configs.PG_PASSWORD,
});

export const connectDatabase = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1 + 1 AS result");
    console.log("Connected to DB 😊");
    client.release();
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export const connectDb = drizzle(pool);
