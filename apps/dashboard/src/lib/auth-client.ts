import { createBetterAuthClient } from "@myapp/auth/client";

export const authClient = createBetterAuthClient(
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
);
