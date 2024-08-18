import { serializeError } from 'serialize-error';

import { getSerializedContact } from '../../_services/getSerializedContact';
import { updateContact } from '../../_services/updateContact';

type Extra = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: Extra) {
  try {
    const data = await getSerializedContact(params.id);

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

export async function PUT(request: Request, { params }: Extra) {
  try {
    const formData = await request.formData();

    await updateContact(params.id, formData);

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
