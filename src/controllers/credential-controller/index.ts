import { credentialsBody } from "@/utils/credentialUtils";
import credentialService from "@/services/credential-service";
import { Request, Response } from "express";

export async function credentialPost(req: Request, res: Response) {
  const credential: credentialsBody = req.body;
  const user = res.locals.user;
  const insert = await credentialService.newCredential(user.id, credential);
  return res.status(201).send(insert);
}

export async function credentialsGet(req: Request, res: Response) {
  const user = res.locals.user;
  const result = await credentialService.showCredentials(user.id);
  return res.status(200).send(result);
}
export async function credentialsById(req: Request, res: Response) {
  const user = res.locals.user;
  const id = Number(req.params.id);
  const result = await credentialService.showCredentialById(user.id, id);
  return res.status(200).send(result);
}

export async function deleteCredential(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = res.locals.user;
  await credentialService.deleteCredential(user.id, id);
}
