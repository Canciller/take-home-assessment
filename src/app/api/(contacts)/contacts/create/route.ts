import { createContact } from '../../_services/createContact';

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    // await sleep(2000);

    const formData = await request.formData();

    const data = await createContact(formData);

    return Response.json(data);
  } catch (error) {
    return Response.json({
      error,
    });
  }
}
