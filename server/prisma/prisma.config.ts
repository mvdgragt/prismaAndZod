// prisma.config.ts

// 1. Import dotenv (CRITICAL for CLI to load .env on EC2)
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // The schema path is required
  schema: "prisma/schema.prisma",

  // 2. The datasource property is now required for the CLI
  datasource: {
    // 3. Use the DIRECT_DATABASE_URL for migrations (TCP connection)
    url: env("DIRECT_DATABASE_URL"),
  },
  // You can also add your migrations path here
  migrations: {
    path: "prisma/migrations",
  },
});
