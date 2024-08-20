import { errorResponse } from '@/utils/errorResponse';

import { signUp } from '../_services/signUp';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await signUp(data);

    return new Response();
  } catch (error) {
    return errorResponse(error);
  }
}
