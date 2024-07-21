import jwt from "jsonwebtoken";
import configs from "../config/config";

const jwtSecretKey = configs.JWT_SECRET_KEY;

const generateToken = (user: any & { id: string }): string => {
  const payload = {
    userId: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: "7d" });

  return token;
};

export { generateToken };
