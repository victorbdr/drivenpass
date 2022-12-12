import { Network } from "@prisma/client";

export type networksBody = {
  title: string;
  network: string;
  password: string;
};

export type postingCredential = Omit<Network, "id" | "userId">;
