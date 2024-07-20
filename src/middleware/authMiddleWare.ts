import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { chechJwt } from "./helpers";

export const verifyToken = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "user Unauthorized",
        status: false,
      });
    }

    const token: any = await chechJwt(req.headers.authorization?.split(" ")[1]);
    if (!token)
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid token",
        status: false,
      });

    req.user = token;

    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Token validation error",
      status: false,
    });
  }
};
