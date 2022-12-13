import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import { prisma } from "@/config";
import Cryptr from "cryptr";

const cryptr = new Cryptr("key");

export async function createNetwork(userId: number) {
  return prisma.network.create({
    data: {
      userId: userId,
      title: faker.lorem.word(),
      network: faker.lorem.word(),
      password: cryptr.encrypt(faker.internet.password()),
    },
  });
}
