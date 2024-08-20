import { errorResponse } from '@/utils/errorResponse';

import { deleteContact } from '../../_services/deleteContact';
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
    return errorResponse(error);
  }
}

export async function PUT(request: Request, { params }: Extra) {
  try {
    const formData = await request.formData();

    await updateContact(params.id, formData);

    return new Response();
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_: Request, { params }: Extra) {
  try {
    await deleteContact(params.id);

    return new Response();
  } catch (error) {
    return errorResponse(error);
  }
}
