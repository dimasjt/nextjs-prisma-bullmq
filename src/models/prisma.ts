import { PrismaClient } from "@prisma/client";

export default function createPrisma() {
  return new PrismaClient();
}
