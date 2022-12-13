import { credentialsBody } from "@/utils/credentialUtils";
import { prisma } from "@/config";
import { unauthorizedError } from "@/errors";

async function getCredential(id: number, userId: number) {
  return await prisma.credential.findFirst({
    where: { id: id, userId: userId },
  });
}
async function getUserCredentials(userId: number) {
  return await prisma.credential.findMany({
    where: { userId: userId },
  });
}
async function uniqueTitle(userId: number, title: string) {
  const tittleExists = await prisma.credential.findFirst({
    where: { title: { equals: title, mode: "insensitive" }, userId },
  });
  if (tittleExists) {
    throw unauthorizedError();
  }
  return tittleExists;
}

async function createCredential(userId: number, credential: credentialsBody) {
  const data = {
    userId,
    ...credential,
  };
  return prisma.credential.create({ data });
}

async function deleteCredential(id: number) {
  const deleteById = prisma.credential.deleteMany({
    where: {
      id: id,
    },
  });
  return deleteById;
}
const credentialRepository = {
  getUserCredentials,
  getCredential,
  createCredential,
  deleteCredential,
  uniqueTitle,
};

export default credentialRepository;
