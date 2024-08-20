import { serializeError } from 'serialize-error';

import { errorResponse } from '@/utils/errorResponse';

import { getCurrentUser } from '../_services/getCurrentUser';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error('Not authenticated.');
    }

    return Response.json(user);
  } catch (error) {
    return errorResponse(error);
  }
}
