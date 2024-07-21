import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import configs from "../config/config";
import * as schema from "../db/schema";

export const client = new pg.Client({
  host: configs.PG_HOST,
  port: parseInt(configs.PG_PORT || "5432"),
  database: configs.PG_DATABASE,
  user: configs.PG_USER,
  password: configs.PG_PASSWORD,
});

export const connectDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to DB 😊");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export const connectDb = drizzle(client, { schema });
