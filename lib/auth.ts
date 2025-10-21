import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma-client";

const prisma = new PrismaClient();

export const auth = betterAuth({
    appName: "TB-AI",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

});