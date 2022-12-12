import { authenticateToken } from "@/middlewares";
import {
  networkPost,
  networksById,
  networksGet,
  deleteNetwork,
} from "@/controllers/network-controller";
import { Router } from "express";

const networkRouter = Router();
networkRouter
  .get("/", authenticateToken, networksGet)
  .get("/:id", authenticateToken, networksById)
  .post("/", authenticateToken, networkPost)
  .delete("/", authenticateToken, deleteNetwork);

export { networkRouter };
