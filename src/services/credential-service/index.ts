import { unauthorizedError } from "@/errors";
import credentialRepository from "@/repositories/credential-repository";
import Cryptr from "cryptr";

import { credentialsBody, postingCredential } from "@/utils/credentialUtils";
import { title } from "process";
import { passwordCryptr } from "@/utils/cryptrUtil";

async function newCredential(userId: number, credential: credentialsBody) {
  await credentialRepository.uniqueTitle(userId, title);

  const hashPassword = await passwordCryptr(credential.password);
  console.log("aqui", credential.password);
  await credentialRepository.createCredential(userId, {
    ...credential,
    password: hashPassword,
  });
}

async function showCredentials(userId: number) {
  const credentials = await credentialRepository.getUserCredentials(userId);

  return credentials.map((credential) => {
    return { ...credential, password: credential.password };
  });
}

async function showCredentialById(id: number, userId: number) {
  const credentialById = await credentialRepository.getCredential(id, userId);
  return credentialById;
}
async function deleteCredential(id: number, userId: number) {
  return await credentialRepository.deleteCredential(id);
}
const credentialService = {
  newCredential,
  showCredentials,
  showCredentialById,
  deleteCredential,
};
export default credentialService;
