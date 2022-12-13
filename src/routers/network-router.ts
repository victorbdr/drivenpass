import { authenticateToken, validateBody } from "@/middlewares";
import {
  networkPost,
  networksById,
  networksGet,
  deleteNetwork,
} from "@/controllers/network-controller";
import { Router } from "express";
import { networkSchema } from "@/schemas/network-schema";

const networkRouter = Router();
networkRouter
  .get("/", authenticateToken, networksGet)
  .get("/:id", authenticateToken, networksById)
  .post("/", authenticateToken, validateBody(networkSchema), networkPost)
  .delete("/:id", authenticateToken, deleteNetwork);

export { networkRouter };
