import { serializeError } from 'serialize-error';

import { deleteSession } from '@/lib/session';

export async function POST() {
  try {
    deleteSession();

    return new Response();
  } catch (error) {
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
}
