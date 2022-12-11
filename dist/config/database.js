import { PrismaClient } from "@prisma/client";
export let prisma;
export function connectDb() {
    prisma = new PrismaClient();
}
export async function disconnectDB() {
    await prisma?.$disconnect();
}
