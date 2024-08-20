import { errorResponse } from '@/utils/errorResponse';

import { createContact } from '../../_services/createContact';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const data = await createContact(formData);

    return Response.json(data);
  } catch (error) {
    return errorResponse(error);
  }
}
