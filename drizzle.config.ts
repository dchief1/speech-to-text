import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value || defaultValue!;
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: getEnvVar("PG_HOST"),
    user: getEnvVar("PG_USER"),
    password: getEnvVar("PG_PASSWORD"),
    database: getEnvVar("PG_DATABASE"),
  },
});
