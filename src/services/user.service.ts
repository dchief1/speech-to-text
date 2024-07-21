import { connectDb } from "../config/database";
import { user } from "../db/schema";
import bcrypt from "bcrypt";
import { InferInsertModel, eq } from "drizzle-orm";
import { generateToken } from "../utils/generateToken";

type NewUser = InferInsertModel<typeof user>;

export async function createUser(newUser: NewUser) {
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const userWithHashedPassword = { ...newUser, password: hashedPassword };

  // Check if the user already exists
  const existingUsers = await connectDb
    .select()
    .from(user)
    .where(eq(user.email, newUser.email));
  if (existingUsers.length > 0) {
    throw new Error("User already exists");
  }

  await connectDb.insert(user).values(userWithHashedPassword).returning();

  const [createdUser] = await connectDb
    .select()
    .from(user)
    .where(eq(user.email, newUser.email));
  const userData = { ...newUser, id: createdUser.id };
  return { userData };
}

export async function loginUser(email: string, password: string) {
  const foundUsers = await connectDb.select().from(user).where(eq(user.email, email));
  if (foundUsers.length === 0) {
    throw new Error("User not found");
  }

  const foundUser = foundUsers[0];

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Generate a token or any other login logic
  const newToken = generateToken(foundUser);
  return { message: "Login successful", token: newToken, userId: foundUser.id };
}
