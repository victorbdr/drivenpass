import { credentialsBody } from "@/utils/credentialUtils";
import credentialService from "@/services/credential-service";
import { Request, Response } from "express";
import { notFoundError, unauthorizedError } from "@/errors";
import httpStatus from "http-status";

export async function credentialPost(req: Request, res: Response) {
  const credential: credentialsBody = req.body;
  const user = res.locals.user;
  const insert = await credentialService.newCredential(user.id, credential);
  return res.status(httpStatus.CREATED).send(insert);
}

export async function credentialsGet(req: Request, res: Response) {
  const user = res.locals.user;
  const result = await credentialService.showCredentials(user.id);
  return res.status(200).send(result);
}
export async function credentialsById(req: Request, res: Response) {
  const user = res.locals.user;
  const id = Number(req.params.id);
  try {
    const result = await credentialService.showCredentialById(id, user.id);
    return res.status(200).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      throw unauthorizedError();
    }
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function deleteCredentialbyId(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = res.locals.user;
  try {
    const result = await credentialService.deleteCredential(id, user.id);
    return res.status(200).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      throw unauthorizedError();
    }
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}
