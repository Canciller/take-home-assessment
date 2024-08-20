import { serializeError } from 'serialize-error';

export function errorResponse(error: any) {
  console.error(error);

  return Response.json(
    {
      error: serializeError(error),
    },
    {
      status: 500,
    }
  );
}
