import app, { init } from "@/app";
import { prisma } from "@/config";
import { invalidEmailError } from "@/errors";
import { faker } from "@faker-js/faker";

import httpStatus from "http-status";
import supertest from "supertest";
import { createNetwork } from "../factories/newtworks-factory";

import { createUser } from "../factories/users-factoryr";
import { cleanDb, generateValidToken } from "../helper";
const generateValidBody = () => ({
  title: faker.lorem.word(),
  network: faker.lorem.word(),
  password: faker.internet.password(),
});
const generateLogin = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(6),
});
beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);
describe("/post /networks", () => {
  it("should respond with status 401 when there's no token", async () => {
    const response = await server.post("/networks");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .post("/networks")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 201 when a new network is created", async () => {
      const login = generateLogin();
      await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      const body = generateValidBody();

      const response = await server
        .post("/networks")
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(httpStatus.CREATED);
    });
    it("should respond with status 400 when there's no body", async () => {
      const login = generateLogin();
      await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;

      const response = await server
        .post("/networks")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });
  });
});

describe("/get /networks", () => {
  it("should respond with status 401 when there's no token", async () => {
    const response = await server.get("/networks");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .get("/networks")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 200 and with ticket data", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      const credential = await createNetwork(user.id);
      const response = await server
        .get("/networks")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: credential.id,
          title: credential.title,
          userId: credential.userId,
          network: credential.network,
          password: credential.password,
        },
      ]);
    });
  });
});
describe("/get /networks/:id", () => {
  it("should respond with status 401 when there's no token", async () => {
    const response = await server.get("/networks/1");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .get("/networks/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 404 for invalid user network id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      createNetwork(user.id);

      const response = await server
        .get("/networks/100")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 200 for user valid network id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      const network = await createNetwork(user.id);
      const response = await server
        .get(`/networks/${network.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe("/delete/:id /networks", () => {
  it("should respond with status 401 when there's no token", async () => {
    const response = await server.get("/networks");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .get("/networks")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 404 for invalid user network id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      createNetwork(user.id);

      const response = await server
        .delete("/networks/100")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 404 for invalid user network id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      createNetwork(user.id);

      const response = await server
        .delete("/networks/0")

        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 404 for invalid user network id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      createNetwork(user.id);

      const response = await server
        .delete("/networks/201")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 200 for user valid network id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      const network = await createNetwork(user.id);
      const response = await server
        .delete(`/networks/${network.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
