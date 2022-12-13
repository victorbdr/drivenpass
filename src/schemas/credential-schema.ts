import { credentialsBody } from "@/utils/credentialUtils";
import Joi from "joi";

export const credentialSchema = Joi.object<credentialsBody>({
  title: Joi.string().required(),
  url: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
