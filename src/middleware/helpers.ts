import jwt from "jsonwebtoken";
import configs from "../config/config";

const chechJwt = async (hash: string, secret: string = configs.JWT_SECRET_KEY ?? "") => {
  try {
    // console.log(hash);
    const token = jwt.verify(hash, secret);
    return token;
  } catch (err) {
    // console.log(err, "TOKEN ERR:::");
    throw err;
  }
};

export { chechJwt as chechJwt };

export function parseJSON(value: any): any {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}
