import { prisma } from "@/config";
async function findByEmail(email) {
    const findEmail = await prisma.user.findUnique({
        where: { email },
    });
    return findEmail;
}
async function create(data) {
    return prisma.user.create({
        data,
    });
}
const userRepository = {
    findByEmail,
    create,
};
export default userRepository;
