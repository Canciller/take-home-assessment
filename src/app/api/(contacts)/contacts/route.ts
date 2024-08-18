import { serializeError } from 'serialize-error';

import { getSerializedContacts } from '../_services/getSerializedContacts';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const data = await getSerializedContacts({
      page: url.searchParams.get('page') ?? undefined,
      limit: url.searchParams.get('limit') ?? undefined,
    });

    return Response.json(data);
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
