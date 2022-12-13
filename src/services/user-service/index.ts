import { unauthorizedError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export type newUser = Omit<User, "id">;

async function createUser(data: newUser) {
  const { email, password } = data;
  await checkEmail(email);
  const passwordHash = await bcrypt.hash(password, 10);
  return userRepository.create({
    email,
    password: passwordHash,
  });
}

async function checkEmail(email: string) {
  const emailCheck = await userRepository.findByEmail(email);
  if (emailCheck) {
    console.log("aqui");
    throw unauthorizedError();
  }
  return emailCheck;
}
async function checkExistingEmail(email: string) {
  const emailCheck = await userRepository.findByEmail(email);
  if (!emailCheck) {
    throw unauthorizedError();
  }
  return emailCheck;
}
async function checkPassword(password: string, userPassword: string) {
  const validPassword = await bcrypt.compare(password, userPassword);
  if (!validPassword) {
    throw unauthorizedError();
  }
}
async function signIn(data: newUser) {
  const { email, password } = data;
  const user = await checkExistingEmail(email);
  await checkPassword(password, user.password);
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );
  return { token };
}
const userService = { createUser, signIn };
export default userService;
