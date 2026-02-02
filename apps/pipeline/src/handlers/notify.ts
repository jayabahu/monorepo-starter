import type { Context } from "aws-lambda";
import { withErrorHandling } from "../lib/wrapper.js";

interface NotifyEvent {
  itemId: string;
  userId: string;
  message: string;
}

interface NotifyResult {
  status: string;
  notifiedAt: string;
}

async function notifyHandler(
  event: NotifyEvent,
  _context: Context,
): Promise<NotifyResult> {
  console.log(`Notifying user ${event.userId} about item ${event.itemId}`);

  // TODO: Implement notification logic

  return {
    status: "notified",
    notifiedAt: new Date().toISOString(),
  };
}

export const handler = withErrorHandling(notifyHandler);
