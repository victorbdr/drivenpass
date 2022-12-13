import userService from "@/services/user-service";
import { Request, Response } from "express";
import httpStatus, { BAD_REQUEST } from "http-status";

export async function signInPost(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const result = await userService.signIn({ email, password });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
