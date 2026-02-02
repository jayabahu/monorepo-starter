import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { Database } from "@myapp/database";
import {
  users as user,
  sessions as session,
  accounts as account,
  verifications as verification,
} from "@myapp/database/schema";

const schema = { user, session, account, verification };

export interface AuthConfig {
  db: Database;
  secret: string;
  baseURL: string;
  trustedOrigins?: string[];
}

export function createAuth(config: AuthConfig) {
  return betterAuth({
    database: drizzleAdapter(config.db, {
      provider: "pg",
      schema,
    }),
    secret: config.secret,
    baseURL: config.baseURL,
    trustedOrigins: config.trustedOrigins ?? [],
    emailAndPassword: {
      enabled: true,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
