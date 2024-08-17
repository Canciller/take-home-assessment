import { z } from 'zod';

import { avatarsBucket } from '@/lib/gcp/storage';
import { getDb } from '@/lib/mongo';

const dataScheme = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  last_contact_date: z.string().datetime(),
  image: z.instanceof(File).transform((f, ctx) => {
    if (f.size === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Image is required.',
      });

      return z.NEVER;
    }

    switch (f.type) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        break;
      default:
        ctx.addIssue({
          code: 'custom',
          message: 'Invalid image type.',
        });

        return z.NEVER;
    }

    return f;
  }),
});

export async function createContact(formData: FormData) {
  const db = await getDb();

  const data = Object.fromEntries(formData.entries());

  const parsedData = dataScheme.parse(data);

  // Save contact to db.
  const contact = await db.collection('contacts').insertOne({
    name: parsedData.name,
    last_contact_date: parsedData.last_contact_date,
    createdAt: new Date(),
    updateAt: new Date(),
  });

  // Save contact image to storage.
  const ext = parsedData.image.name.split('.').pop();
  const path = `${contact.insertedId}.${ext}`;

  const buffer = Buffer.from(await parsedData.image.arrayBuffer());

  await avatarsBucket.file(path).save(buffer, {
    contentType: parsedData.image.type,
    metadata: {
      contentType: parsedData.image.type,
    },
  });

  // Save contact image reference to db.
  await db.collection('avatars').insertOne({
    path,
    contact: contact.insertedId,
    createdAt: new Date(),
    updateAt: new Date(),
  });

  return {
    insertedId: contact.insertedId,
  };
}
