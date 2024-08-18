import { serializeError } from 'serialize-error';

import { createContact } from '../../_services/createContact';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const data = await createContact(formData);

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
