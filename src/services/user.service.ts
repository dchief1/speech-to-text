import { connectDb } from "../config/database";
import { user } from "../db/schema";
import bcrypt from "bcrypt";
import { InferInsertModel } from "drizzle-orm";
import { generateToken } from "../utils/generateToken";
import { eq, or } from "drizzle-orm/expressions";
import ConflictError from "../errors/conflict";
import BadRequestError from "../errors/bad-request";
import { createSession } from "../middleware/session";

export type UserDataType = {
  username: string;
  password: string;
  email: string;
};

export const createUser = async (payload: UserDataType) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const userWithHashedPassword = { ...payload, password: hashedPassword };

  const existingUsers = await connectDb
    .select()
    .from(user)
    .where(or(eq(user.email, payload.email), eq(user.username, payload.username)));

  if (existingUsers.length > 0) {
    throw new ConflictError("User already exists");
  }

  await connectDb.insert(user).values(userWithHashedPassword).returning();

  const [createdUser] = await connectDb
    .select()
    .from(user)
    .where(eq(user.email, payload.email));

  return {
    status: true,
    message: `User Created`,
    data: createdUser,
  };
};

export const loginUser = async (email: string, password: string) => {
  const foundUsers = await connectDb.select().from(user).where(eq(user.email, email));
  if (foundUsers.length === 0) {
    throw new BadRequestError("Incorrect login details");
  }

  const foundUser = foundUsers[0];

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    throw new BadRequestError("Incorrect login details");
  }

  const sessionPayload = {
    id: foundUser.id,
    email: foundUser.email,
  };

  console.log(sessionPayload);

  const testSession = await createSession(foundUser.id, sessionPayload);
  console.log(testSession);

  // Generate a token or any other login logic
  const newToken = generateToken(foundUser);

  return { message: "Login successful", token: newToken };
};
