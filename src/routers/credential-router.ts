import { Router } from "express";
import { validateBody } from "@/middlewares";
import {
  credentialPost,
  credentialsGet,
  credentialsById,
  deleteCredentialbyId,
} from "@/controllers/credential-controller";
import { authenticateToken } from "@/middlewares";
import { credentialSchema } from "@/schemas/credential-schema";

const credentialRouter = Router();
credentialRouter
  .get("/", authenticateToken, credentialsGet)
  .get("/:id", authenticateToken, credentialsById)
  .post("/", authenticateToken, validateBody(credentialSchema), credentialPost)
  .delete("/:id", authenticateToken, deleteCredentialbyId);

export { credentialRouter };
