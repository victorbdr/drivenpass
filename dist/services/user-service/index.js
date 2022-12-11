import { unauthorizedError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function createUser(data) {
    const { email, password } = data;
    await checkEmail(email);
    const passwordHash = await bcrypt.hash(password, 10);
    return userRepository.create({
        email,
        password: passwordHash,
    });
}
async function checkEmail(email) {
    const emailCheck = await userRepository.findByEmail(email);
    if (emailCheck) {
        throw unauthorizedError();
    }
    return emailCheck;
}
async function checkPassword(password, userPassword) {
    const validPassword = await bcrypt.compare(password, userPassword);
    if (!validPassword) {
        throw unauthorizedError();
    }
}
async function signIn(data) {
    const { email, password } = data;
    const user = await checkEmail(email);
    checkPassword(password, user.password);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
}
const userService = { createUser, signIn };
export default userService;
