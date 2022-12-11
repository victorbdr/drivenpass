import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "./config";
loadEnv();
import { handleApplicationErrors } from "@/middlewares";
import { userRouter } from "@/routers";
const app = express();
app
    .use(cors())
    .use(express.json())
    .get("/health", (_req, res) => res.send("OK!"))
    .use("/")
    .use("/users", userRouter)
    .use("/register")
    .use(handleApplicationErrors);
export function init() {
    connectDb();
    return Promise.resolve(app);
}
export async function close() {
    await disconnectDB();
}
export default app;
