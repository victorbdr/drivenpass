import { newUser } from "@/services";
import Joi from "joi";

export const signInSchema = Joi.object<newUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
