import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { prisma } from "@/config";
import { createUser } from "./factories/users-factoryr";

export async function cleanDb() {
  await prisma.network.deleteMany({});
  await prisma.network.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user: User) {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  console.log(token);
  return token;
}
