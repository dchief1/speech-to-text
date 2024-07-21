import { Request, Response } from "express";
import { createUser, loginUser } from "../../services/user.service";
import { StatusCodes } from "http-status-codes";
import { createUserSchema } from "./user.validation";
import IUser from "./user.interface";

export async function register(req: Request, res: Response) {
  try {
    const { error } = createUserSchema.validate(req.body);

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid request body",
        error: error.details[0].message,
      });
    }

    const newUser = req.body as IUser;
    const createdUser = await createUser(newUser);
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as Pick<IUser, "email" | "password">;

    const loginResult = await loginUser(email, password);
    res.status(StatusCodes.OK).json(loginResult);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}
