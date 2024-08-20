import { errorResponse } from '@/utils/errorResponse';

import { signIn } from '../_services/signIn';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await signIn(data);

    return new Response();
  } catch (error) {
    return errorResponse(error);
  }
}
