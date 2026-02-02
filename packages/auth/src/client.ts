import { createAuthClient } from "better-auth/client";

export function createBetterAuthClient(baseURL: string) {
  return createAuthClient({
    baseURL,
  });
}

export type AuthClient = ReturnType<typeof createBetterAuthClient>;
