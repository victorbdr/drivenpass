import { Router } from "express";
import { validateBody } from "@/middlewares";
import {
  credentialPost,
  credentialsGet,
  credentialsById,
  deleteCredential,
} from "@/controllers/credential-controller";
import { authenticateToken } from "@/middlewares";

const credentialRouter = Router();
credentialRouter
  .get("/", authenticateToken, credentialsGet)
  .post("/", authenticateToken, credentialPost)
  .delete("/", authenticateToken, deleteCredential);

export { credentialRouter };
