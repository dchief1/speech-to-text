import dotenv from "dotenv";

dotenv.config();

module.exports = {
  migrationsFolder: "./migrations",
  driver: "pg",
  connection: {
    user: process.env.PG_USER as string,
    host: process.env.PG_HOST as string,
    database: process.env.PG_DATABASE as string,
    password: process.env.PG_PASSWORD as string,
    port: process.env.PG_PORT as string,
  },
};
