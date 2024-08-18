import { z } from 'zod';

import { getDb } from '@/lib/mongo';

import { getSignedUrl } from './getSignedUrl';
import { ContactDocument } from '../_types/ContactDocument';
import { GetSerializedContactsResponse } from '../_types/GetSerializedContactsResponse';
import { SerializedContact } from '../_types/SerializedContact';

const paramsScheme = z.object({
  page: z.coerce.number().min(1),
  limit: z.coerce.number().min(1),
});

export async function getSerializedContacts(params: {
  page?: number | string;
  limit?: number | string;
}): Promise<GetSerializedContactsResponse> {
  const { page, limit } = paramsScheme.parse(params);

  const db = await getDb();

  const skip = (page - 1) * limit;

  const totalCount = await db.collection('contacts').countDocuments();

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
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    page,
    limit,
  };
}
