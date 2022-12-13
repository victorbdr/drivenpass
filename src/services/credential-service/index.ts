import { notFoundError, unauthorizedError } from "@/errors";
import credentialRepository from "@/repositories/credential-repository";
import Cryptr from "cryptr";

import { credentialsBody, postingCredential } from "@/utils/credentialUtils";

import { passwordCryptr } from "@/utils/cryptrUtil";
import { title } from "process";

async function newCredential(userId: number, credential: credentialsBody) {
  const titleCheck = await credentialRepository.uniqueTitle(userId, title);
  if (titleCheck) {
    throw unauthorizedError();
  }

  const hashPassword = await passwordCryptr(credential.password);
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
  if (!credentialById) {
    throw notFoundError();
  }
  return credentialById;
}
async function deleteCredential(id: number, userId: number) {
  const credentialCheck = await showCredentialById(id, userId);
  if (!credentialCheck) {
    throw notFoundError();
  }
  await credentialRepository.deleteCredential(id);
}
const credentialService = {
  newCredential,
  showCredentials,
  showCredentialById,
  deleteCredential,
};
export default credentialService;
