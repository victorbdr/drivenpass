import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { prisma } from "@/config";
import Cryptr from "cryptr";
import { createUser } from "./users-factoryr";
import { generateValidToken } from "../helper";

const cryptr = new Cryptr("key");

export async function createCredential(userId: number) {
  return await prisma.credential.create({
    data: {
      userId: userId,
      title: faker.lorem.word(),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: cryptr.encrypt(faker.internet.password()),
    },
  });
}
