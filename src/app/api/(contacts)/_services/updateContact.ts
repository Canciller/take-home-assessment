import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { avatarsBucket } from '@/lib/gcp/storage';
import { getDb } from '@/lib/mongo';
import { getSession } from '@/lib/session';

type ContactDocument = {
  name: string;
  last_contact_date: Date;
  updatedAt: Date;
};

const dataScheme = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  last_contact_date: z.string().datetime(),
  image: z
    .instanceof(File)
    .optional()
    .transform((f, ctx) => {
      if (!f) {
        return f;
      }

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

export async function updateContact(id: string, formData: FormData) {
  const session = await getSession();

  if (!session) {
    throw new Error('Not authorized');
  }

  const db = await getDb();

  const data = Object.fromEntries(formData.entries());

  const parsedData = dataScheme.parse(data);

  const result = await db.collection<ContactDocument>('contacts').updateOne(
    {
      owner: new ObjectId(session.userId),
      _id: new ObjectId(id),
    },
    {
      $set: {
        name: parsedData.name,
        last_contact_date: new Date(parsedData.last_contact_date),
        updatedAt: new Date(),
      },
    },
    {
      ignoreUndefined: true,
    }
  );

  // Save new contact image to storage.
  if (result.matchedCount && parsedData.image) {
    const ext = parsedData.image.name.split('.').pop();
    const path = `${id}.${ext}`;

    const buffer = Buffer.from(await parsedData.image.arrayBuffer());

    await avatarsBucket.file(path).save(buffer, {
      contentType: parsedData.image.type,
      metadata: {
        contentType: parsedData.image.type,
      },
    });

    await db.collection('avatars').updateOne(
      {
        contact: new ObjectId(id),
      },
      {
        $set: {
          path,
          updatedAt: new Date(),
        },
      },
      {
        ignoreUndefined: true,
      }
    );
  }
}
