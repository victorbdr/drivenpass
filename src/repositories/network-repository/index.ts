import { prisma } from "@/config";
import { unauthorizedError } from "@/errors";
import { networksBody } from "@/utils/networkUtils";

async function getNetwork(id: number, userId: number) {
  return await prisma.network.findFirst({
    where: { id: id, userId },
  });
}
async function getUserNetworks(userId: number) {
  return await prisma.network.findMany({
    where: { userId: userId },
  });
}
async function uniqueTitle(userId: number, title: string) {
  const tittleExists = await prisma.network.findFirst({
    where: { title: { equals: title, mode: "insensitive" }, userId },
  });
  if (tittleExists) {
    throw unauthorizedError;
  }
}

async function createNetwork(userId: number, network: networksBody) {
  const data = {
    userId,
    ...network,
  };
  return prisma.network.create({ data });
}

async function deleteNetwork(id: number) {
  const deleteById = prisma.network.delete({
    where: {
      id: id,
    },
  });
  return deleteById;
}
const networkRepository = {
  getUserNetworks,
  getNetwork,
  createNetwork,
  deleteNetwork,
  uniqueTitle,
};

export default networkRepository;
