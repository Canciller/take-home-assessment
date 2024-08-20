import { serializeError } from 'serialize-error';

import { signUp } from '../_services/signUp';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await signUp(data);

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
