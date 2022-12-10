import express from "express";
import { test } from "./controllers/index.js";
var server = express();
server.get("/health", function (req, res) {
    res.send("ok");
});
server.get("/test", test);
server.listen(4000, function () {
    console.log("online");
});
