import express from "express";

const server = express();

server.get("/health", (req, res) => {
  res.send("ok");
});

server.listen(4000, () => {
  console.log("online");
});
