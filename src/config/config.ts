import dotenv from "dotenv";

dotenv.config();

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 9000,
  ENVIRONMENT: process.env.ENVIRONMENT,

  DB_TEST_URL: process.env.DB_TEST_URL as string,
  PG_HOST: process.env.PG_HOST as string,
  PG_PORT: process.env.PG_PORT as string,
  PG_DATABASE: process.env.PG_DATABASE as string,
  PG_USER: process.env.PG_USER as string,
  PG_PASSWORD: process.env.PG_PASSWORD as string,
  REDIS_URL: process.env.REDIS_URL as string,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,

  // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
  // BUCKET_REGION: process.env.BUCKET_REGION as string,
};

export default configs;
