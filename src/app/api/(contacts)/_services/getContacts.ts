import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { avatarsBucket } from '@/lib/gcp/storage';
import { getDb } from '@/lib/mongo';

type ContactDocument = {
  _id: ObjectId;
  name: string;
  image?: {
    path: string;
    signedUrl: string;
  };
  last_contact_date: Date;
  createdAt: Date;
  updatedAt: Date;
};

const paramsScheme = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
});

export async function getContacts(params: {
  page?: number | string;
  limit?: number | string;
}) {
  const { page, limit } = paramsScheme.parse(params);

  const db = await getDb();

  const skip = (page - 1) * limit;

  const count = await db.collection('contacts').countDocuments();

  const data = await db
    .collection('contacts')
    .aggregate<ContactDocument>([
      {
        $lookup: {
          from: 'avatars',
          localField: '_id',
          foreignField: 'contact',
          as: 'image',
        },
      },
      {
        $unwind: {
          path: '$image',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { createdAt: 1 } },
      { $skip: skip },
      { $limit: limit },
    ])
    .toArray();

  // Get file names from contacts.
  const avatarFileNames = data
    .filter((contact) => contact.image)
    .map((contact) => contact.image?.path as string);

  // Generate signed URLs for all avatar file names.
  const signedUrlsPromises = avatarFileNames.map((fileName) =>
    getSignedUrl(fileName)
  );

  const signedUrls = await Promise.all(signedUrlsPromises);

  // Map signed URLs back to contacts.
  for (const contact of data) {
    if (contact.image) {
      const index = avatarFileNames.indexOf(contact.image.path);
      if (index !== -1) {
        contact.image.signedUrl = signedUrls[index];
      }
    }
  }

  return {
    data,
    count,
  };
}

async function getSignedUrl(fileName: string): Promise<string> {
  const [url] = await avatarsBucket.file(fileName).getSignedUrl({
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
  });

  return url;
}
