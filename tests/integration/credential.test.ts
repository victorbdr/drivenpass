import app, { init } from "@/app";
import { prisma } from "@/config";
import { invalidEmailError } from "@/errors";
import { faker } from "@faker-js/faker";

import httpStatus from "http-status";
import supertest from "supertest";
import { createCredential } from "../factories/credentials-factory";
import { createUser } from "../factories/users-factoryr";
import { cleanDb, generateValidToken } from "../helper";
const generateValidBody = () => ({
  title: faker.lorem.word(),
  url: faker.internet.url(),
  username: faker.internet.userName(),
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
describe("/post /credentials", () => {
  it("should respond with status 401 when there's no token", async () => {
    const response = await server.post("/credentials");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 201 when a new credential is created", async () => {
      const login = generateLogin();
      await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      const body = generateValidBody();

      const response = await server
        .post("/credentials")
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
        .post("/credentials")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });
  });
});

describe("/get /credentials", () => {
  it("should respond with status 401 when there's no token", async () => {
    const response = await server.get("/credentials");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .get("/credentials")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 200 and with ticket data", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      const credential = await createCredential(user.id);
      const response = await server
        .get("/credentials")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: credential.id,
          title: credential.title,
          url: credential.url,
          userId: credential.userId,
          username: credential.username,
          password: credential.password,
        },
      ]);
    });
  });
});
describe("/get:id /credentials", () => {
  it("should respond with status 401 when there's no token", async () => {
    const response = await server.get("/credentials/1");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .get("/credentials/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 404 for invalid user credential id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      createCredential(user.id);

      const response = await server
        .get("/credentials/100")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 200 for user valid credential id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      const credential = createCredential(user.id);
      const response = await server
        .get(`/credentials/${(await credential).id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe("/delete/:id /credentials", () => {
  it("should respond with status 401 when there's no token", async () => {
    const response = await server.get("/credentials");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .get("/credentials")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 404 for invalid user credential id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      createCredential(user.id);

      const response = await server
        .delete("/credentials/100")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should respond with status 200 for user valid credential id", async () => {
      const login = generateLogin();
      const user = await createUser(login);
      const send = await server.post("/users").send(login);
      const token = send.body.token;
      const credential = await createCredential(user.id);
      const response = await server
        .delete(`/credentials/${credential.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
