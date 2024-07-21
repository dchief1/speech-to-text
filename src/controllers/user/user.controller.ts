import { createUser, loginUser } from "../../services/user.service";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant";

export const register: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await createUser(req.body));
  } catch (error) {
    next(error);
  }
};

export const login: Controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    res.status(StatusCodes.OK).json(await loginUser(email, password));
  } catch (error: any) {
    next(error);
  }
};
