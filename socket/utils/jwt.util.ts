import jwt from "jsonwebtoken";
import { configuration } from "@/config";

const jwtOptions : any = {
  algorithm: configuration.jwt.algorithm,
  expiresIn: configuration.jwt.expiresIn
};

const jwtSecret = configuration.jwt.secret;

export const generateToken = (payload: any) => {
  return jwt.sign(payload, jwtSecret, jwtOptions);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

