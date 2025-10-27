import jwt from "jsonwebtoken";
import configuration from "@config/index";

const jwtOptions = {
  algorithm: configuration.jwt.algorithm,
  expiresIn: configuration.jwt.expiresIn
};

const jwtSecret = configuration.jwt.secret;

export const generateToken = (payload: any) => {
  return jwt.sign(payload, jwtSecret, jwtOptions);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};