import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const accelerateUrl = process.env.DATABASE_URL;

if (!accelerateUrl) {
  throw new Error(
    "DATABASE_URL is not set. It must contain the 'prisma+postgres://' connection string."
  );
}

export const prisma = new PrismaClient({
  accelerateUrl: accelerateUrl,
}).$extends(withAccelerate());
