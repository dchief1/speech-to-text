import jwt from "jsonwebtoken";
import configs from "../config/config";
import IUser from "../interfaces/user.interface";

const jwtSecretKey = configs.JWT_SECRET_KEY;

const generateToken = (user: any & { _id: string }): string => {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "7d" });

  return token;
};

export { generateToken };
