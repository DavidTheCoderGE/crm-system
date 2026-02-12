import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppRole, JwtUser } from "../types.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ message: "Token fehlt" });

  const token = auth.slice(7);
  try {
    req.user = jwt.verify(token, env.jwtSecret) as JwtUser;
    next();
  } catch {
    return res.status(401).json({ message: "Ungültiges Token" });
  }
};

export const authorize = (...roles: AppRole[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Keine Berechtigung" });
  }
  next();
};
