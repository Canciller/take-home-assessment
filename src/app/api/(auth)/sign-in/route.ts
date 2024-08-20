import { serializeError } from 'serialize-error';

import { signIn } from '../_services/signIn';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await signIn(data);

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
