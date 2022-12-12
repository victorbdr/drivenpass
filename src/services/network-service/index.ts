import { unauthorizedError } from "@/errors";
import networkRepository from "@/repositories/network-repository";

import { networksBody } from "@/utils/networkUtils";
import { title } from "process";
import { passwordCryptr } from "@/utils/cryptrUtil";

async function newNetwork(userId: number, network: networksBody) {
  await networkRepository.uniqueTitle(userId, title);

  const hashPassword = await passwordCryptr(network.password);
  console.log("aqui", network.password);
  await networkRepository.createNetwork(userId, {
    ...network,
    password: hashPassword,
  });
}

async function showNetworks(userId: number) {
  const networks = await networkRepository.getUserNetworks(userId);

  return networks.map((network) => {
    return { ...network, password: network.password };
  });
}

async function showNetworkById(id: number, userId: number) {
  const networkById = await networkRepository.getNetwork(id, userId);
  return networkById;
}
async function deleteNetwork(id: number, userId: number) {
  return await networkRepository.deleteNetwork(id);
}
const networkService = {
  newNetwork,
  showNetworks,
  showNetworkById,
  deleteNetwork,
};
export default networkService;
