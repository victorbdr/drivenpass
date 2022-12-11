import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
async function findByEmail(email: string) {
  const findEmail = await prisma.user.findUnique({
    where: { email },
  });
  return findEmail;
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}
const userRepository = {
  findByEmail,
  create,
};

export default userRepository;
