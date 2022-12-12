import { Credential } from "@prisma/client";

export type credentialsBody = {
  title: string;
  url: string;
  username: string;
  password: string;
};

export type postingCredential = Omit<Credential, "id" | "userId">;
