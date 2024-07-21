import BadRequestError from "../errors/bad-request";
import { redis } from "../utils/constant";
import { CustomRedis } from "../utils/redis";

export type DecodedUser = {
  id: number;
  email: string;
};

export const createSession = async (id: number, payload: DecodedUser) => {
  const key = `auth:sessions:${id}`;

  try {
    const redisInstance = new CustomRedis(redis as unknown as string);

    // Retrieve current session if it exists
    const currentSession = await redisInstance.get(key);

    // If a session exists, delete it
    if (currentSession) {
      await redisInstance.delete(key);
    }

    // Set the new session with a duration of 30 minutes (60 seconds * 30)
    const duration = 60 * 30;

    //const durationFor7Days = duration * 24 * 7;

    // Duration for 1000 days (in minutes)
    const durationFor1000Days = duration * 24 * 1000;

    await redisInstance.setEx(key, payload, durationFor1000Days);

    return id;
  } catch (error) {
    console.error("Error creating session:", (error as Error).message);
    throw new BadRequestError(`Error creating session`);
  }
};

export const getSession = async (id: number) => {
  const key = `auth:sessions:${id}`;

  const redisInstance = new CustomRedis(redis as unknown as string);

  // Retrieve current session if it exists
  const session = await redisInstance.get(key);

  if (!session || session === "") return false;

  return session;
};

export const deleteSession = async (id: number) => {
  const key = `auth:sessions:${id}`;
  const redisInstance = new CustomRedis(redis as unknown as string);

  await redisInstance.delete(key);

  return true;
};
