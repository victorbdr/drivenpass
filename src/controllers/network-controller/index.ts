import { networksBody } from "@/utils/networkUtils";
import networkService from "@/services/network-service";
import { Request, Response } from "express";

export async function networkPost(req: Request, res: Response) {
  const network: networksBody = req.body;
  const user = res.locals.user;
  const insert = await networkService.newNetwork(user.id, network);
  return res.status(201).send(insert);
}

export async function networksGet(req: Request, res: Response) {
  const user = res.locals.user;
  const result = await networkService.showNetworks(user.id);
  return res.status(200).send(result);
}
export async function networksById(req: Request, res: Response) {
  const user = res.locals.user;
  const id = Number(req.params.id);
  const result = await networkService.showNetworkById(user.id, id);
  return res.status(200).send(result);
}

export async function deleteNetwork(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = res.locals.user;
  await networkService.deleteNetwork(user.id, id);
}
