import app, { init } from "@/app";
import { prisma } from "@/config";
import { invalidEmailError } from "@/errors";
import { faker } from "@faker-js/faker";

import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/users-factoryr";
import { cleanDb, generateValidToken } from "../helper";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /users/sign-up", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users/sign-up");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/users/sign-up").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(7),
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
      const body = generateValidBody();
      const response = await server.post("/users/sign-up").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        email: body.email,
      });
    });
  });
});

describe("POST /users", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/users").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = generateValidBody();

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if password is not correct", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/users").send({
        email: body.email,
        password: faker.lorem.word(7),
      });
      console.log(response, "response");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/users").send(body);

        expect(response.status).toBe(httpStatus.OK);
      });

      it("should respond with session token", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/users").send(body);

        expect(response.body.token).toBeDefined();
      });
    });
  });
});
