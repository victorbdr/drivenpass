import { networksBody } from "@/utils/networkUtils";
import Joi from "joi";

export const networkSchema = Joi.object<networksBody>({
  title: Joi.string().required(),
  network: Joi.string().required(),
  password: Joi.string().required(),
});
