import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "gateway01.ap-northeast-1.prod.aws.tidbcloud.com",
  port: 4000,
  user: "CtMVpGmLWzBC7Si.root",
  password: "fgaDJo4s8aqbYBHY",
  database: "noticeboard",
  ssl: {
    rejectUnauthorized: true,
  },
});

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}