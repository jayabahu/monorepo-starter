import type { Context } from "aws-lambda";
import { withErrorHandling } from "../lib/wrapper.js";

interface StoreEvent {
  itemId: string;
  data: Record<string, unknown>;
}

interface StoreResult {
  status: string;
  itemId: string;
  storedAt: string;
}

async function storeHandler(
  event: StoreEvent,
  _context: Context,
): Promise<StoreResult> {
  console.log(`Storing item: ${event.itemId}`);

  // TODO: Implement storage logic with @myapp/database and @myapp/storage

  return {
    status: "stored",
    itemId: event.itemId,
    storedAt: new Date().toISOString(),
  };
}

export const handler = withErrorHandling(storeHandler);
