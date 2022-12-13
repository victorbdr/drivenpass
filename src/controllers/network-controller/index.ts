import { networksBody } from "@/utils/networkUtils";
import networkService from "@/services/network-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { unauthorizedError } from "@/errors";

export async function networkPost(req: Request, res: Response) {
  const network: networksBody = req.body;
  const user = res.locals.user;
  const insert = await networkService.newNetwork(user.id, network);
  return res.status(httpStatus.CREATED).send(insert);
}

export async function networksGet(req: Request, res: Response) {
  const user = res.locals.user;
  const result = await networkService.showNetworks(user.id);
  return res.status(200).send(result);
}

export async function networksById(req: Request, res: Response) {
  const user = res.locals.user;
  const id = Number(req.params.id);
  try {
    const result = await networkService.showNetworkById(id, user.id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function deleteNetwork(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = res.locals.user;

  try {
    const result = await networkService.deleteNetwork(id, user.id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}
