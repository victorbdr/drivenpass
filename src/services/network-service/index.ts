import { notFoundError, unauthorizedError } from "@/errors";
import networkRepository from "@/repositories/network-repository";

import { networksBody } from "@/utils/networkUtils";

import { passwordCryptr } from "@/utils/cryptrUtil";

async function newNetwork(userId: number, network: networksBody) {
  const hashPassword = await passwordCryptr(network.password);
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
  if (!networkById) {
    throw notFoundError();
  }
  return networkById;
}
async function deleteNetwork(id: number, userId: number) {
  await showNetworkById(id, userId);
  await networkRepository.deleteNetwork(id);
}
const networkService = {
  newNetwork,
  showNetworks,
  showNetworkById,
  deleteNetwork,
};
export default networkService;
