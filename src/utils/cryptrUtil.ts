import Cryptr from "cryptr";

export async function passwordCryptr(password: string) {
  const key = process.env.CRYPTR_KEY;
  const crypto = new Cryptr(key);
  const passwordEncrypt = crypto.encrypt(password);
  return passwordEncrypt;
}
