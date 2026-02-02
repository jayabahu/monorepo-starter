import type { Context, Handler } from "aws-lambda";

type AsyncHandler<TEvent = unknown, TResult = unknown> = (
  event: TEvent,
  context: Context,
) => Promise<TResult>;

export function withErrorHandling<TEvent = unknown, TResult = unknown>(
  handler: AsyncHandler<TEvent, TResult>,
): Handler<TEvent, TResult> {
  return async (event: TEvent, context: Context) => {
    const requestId = context.awsRequestId;
    console.log(JSON.stringify({ requestId, event, message: "Handler invoked" }));

    try {
      const result = await handler(event, context);
      console.log(JSON.stringify({ requestId, message: "Handler completed" }));
      return result;
    } catch (error) {
      console.error(
        JSON.stringify({
          requestId,
          message: "Handler failed",
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        }),
      );
      throw error;
    }
  };
}
