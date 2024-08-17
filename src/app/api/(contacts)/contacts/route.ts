import { getContacts } from '../_services/getContacts';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const data = await getContacts({
      page: url.searchParams.get('page') ?? undefined,
      limit: url.searchParams.get('limit') ?? undefined,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({
      error,
    });
  }
}
