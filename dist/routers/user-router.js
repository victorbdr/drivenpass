import { Router } from "express";
import { signInPost, createUser } from "@/controllers/user-controller";
const userRouter = Router();
userRouter.post("/", signInPost);
userRouter.post("/sign-up", createUser);
export { userRouter };
