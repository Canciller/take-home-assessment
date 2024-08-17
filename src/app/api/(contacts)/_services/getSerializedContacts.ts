import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { avatarsBucket } from '@/lib/gcp/storage';
import { getDb } from '@/lib/mongo';

import { GetSerializedContactsResponse } from '../_types/GetSerializedContactsResponse';
import { SerializedContact } from '../_types/SerializedContact';

type Document = {
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
  page: z.coerce.number().min(1),
  limit: z.coerce.number().min(10),
});

export async function getSerializedContacts(params: {
  page?: number | string;
  limit?: number | string;
}): Promise<GetSerializedContactsResponse> {
  const { page, limit } = paramsScheme.parse(params);

  const db = await getDb();

  const skip = (page - 1) * limit;

  const total = await db.collection('contacts').countDocuments();

  const data = await db
    .collection('contacts')
    .aggregate<Document>([
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
      { $sort: { last_contact_date: -1 } },
      { $skip: skip },
      { $limit: limit },
    ])
    .toArray();

  const contacts = data.map<SerializedContact>((contact) => ({
    _id: contact._id.toString(),
    name: contact.name,
    image: contact.image
      ? {
          path: contact.image.path,
          signedUrl: contact.image.signedUrl,
        }
      : undefined,
    last_contact_date: contact.last_contact_date.toISOString(),
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
  }));

  // Get file names from contacts.
  const avatarFileNames = contacts
    .filter((contact) => contact.image)
    .map((contact) => contact.image?.path as string);

  // Generate signed URLs for all avatar file names.
  const signedUrlsPromises = avatarFileNames.map((fileName) =>
    getSignedUrl(fileName)
  );

  const signedUrls = await Promise.all(signedUrlsPromises);

  // Map signed URLs back to contacts.
  for (const contact of contacts) {
    if (contact.image) {
      const index = avatarFileNames.indexOf(contact.image.path);
      if (index !== -1) {
        contact.image.signedUrl = signedUrls[index];
      }
    }
  }

  return {
    data: contacts,
    count: contacts.length,
    total,
    page,
    limit,
  };
}

async function getSignedUrl(fileName: string): Promise<string> {
  const [url] = await avatarsBucket.file(fileName).getSignedUrl({
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
  });

  return url;
}
