import { prisma } from "@/config";

import { networksBody } from "@/utils/networkUtils";

async function getNetwork(id: number, userId: number) {
  return await prisma.network.findFirst({
    where: { id: id, userId: userId },
  });
}
async function getUserNetworks(userId: number) {
  return await prisma.network.findMany({
    where: { userId: userId },
  });
}

async function createNetwork(userId: number, network: networksBody) {
  const data = {
    userId,
    ...network,
  };
  return prisma.network.create({ data });
}

async function deleteNetwork(id: number) {
  return prisma.network.delete({
    where: {
      id: id,
    },
  });
}
const networkRepository = {
  getUserNetworks,
  getNetwork,
  createNetwork,
  deleteNetwork,
};

export default networkRepository;
