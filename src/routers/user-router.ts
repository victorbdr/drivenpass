import { Router } from "express";
import { signInPost, createUser } from "@/controllers/user-controller";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas/user-schema";

const userRouter = Router();
userRouter.post("/", validateBody(signInSchema), signInPost);
userRouter.post("/sign-up", validateBody(signInSchema), createUser);

export { userRouter };
