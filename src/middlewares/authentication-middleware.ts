import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { unauthorizedError } from "@/errors";

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) return generateUnauthorizedResponse(res);

  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) return generateUnauthorizedResponse(res);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    if (!user) return generateUnauthorizedResponse(res);

    res.locals.user = user;

    next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
