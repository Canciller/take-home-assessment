import { deleteSession } from '@/lib/session';
import { errorResponse } from '@/utils/errorResponse';

export async function POST() {
  try {
    deleteSession();

    return new Response();
  } catch (error) {
    return errorResponse(error);
  }
}
