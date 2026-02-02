import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let db: ReturnType<typeof createDb> | null = null;

function createDb(url?: string) {
  const connectionString = url ?? process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const client = postgres(connectionString);
  return drizzle(client, { schema });
}

export function getDb(url?: string) {
  if (!db) {
    db = createDb(url);
  }
  return db;
}

export type Database = ReturnType<typeof getDb>;
