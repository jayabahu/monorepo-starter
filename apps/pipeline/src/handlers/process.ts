import type { Context } from "aws-lambda";
import { withErrorHandling } from "../lib/wrapper.js";

interface ProcessEvent {
  itemId: string;
  payload: Record<string, unknown>;
}

interface ProcessResult {
  status: string;
  itemId: string;
  processedAt: string;
}

async function processHandler(
  event: ProcessEvent,
  _context: Context,
): Promise<ProcessResult> {
  console.log(`Processing item: ${event.itemId}`);

  // TODO: Implement processing logic

  return {
    status: "processed",
    itemId: event.itemId,
    processedAt: new Date().toISOString(),
  };
}

export const handler = withErrorHandling(processHandler);
