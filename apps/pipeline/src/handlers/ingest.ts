import type { Context } from "aws-lambda";
import { withErrorHandling } from "../lib/wrapper.js";

interface IngestEvent {
  source: string;
  payload: Record<string, unknown>;
}

interface IngestResult {
  status: string;
  itemId: string;
}

async function ingestHandler(
  event: IngestEvent,
  _context: Context,
): Promise<IngestResult> {
  console.log(`Ingesting from source: ${event.source}`);

  // TODO: Implement ingestion logic
  const itemId = crypto.randomUUID();

  return {
    status: "ingested",
    itemId,
  };
}

export const handler = withErrorHandling(ingestHandler);
