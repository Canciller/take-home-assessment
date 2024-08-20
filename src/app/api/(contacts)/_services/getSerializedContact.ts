import { ObjectId } from 'mongodb';

import { getDb } from '@/lib/mongo';
import { getSession } from '@/lib/session';

import { getSignedUrl } from './getSignedUrl';
import { ContactDocument } from '../_types/ContactDocument';
import { GetSerializedContactResponse } from '../_types/GetSerializedContactResponse';

export async function getSerializedContact(
  id: string
): Promise<GetSerializedContactResponse> {
  const session = await getSession();

  if (!session) {
    throw new Error('Not authorized');
  }

  const db = await getDb();

  const arr = await db
    .collection('contacts')
    .aggregate<ContactDocument>([
      {
        $match: {
          owner: new ObjectId(session.userId),
          _id: new ObjectId(id),
        },
      },
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
    ])
    .toArray();

  const data = arr.length ? arr[0] : null;

  if (!data) {
    return {
      data: null,
    };
  }

  const contact = {
    _id: data._id.toString(),
    name: data.name,
    image: data.image
      ? {
          path: data.image.path,
          signedUrl: data.image.signedUrl,
        }
      : undefined,
    last_contact_date: data.last_contact_date.toISOString(),
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };

  const signedUrl = data.image
    ? await getSignedUrl(data.image?.path)
    : undefined;

  if (contact.image && signedUrl) {
    contact.image.signedUrl = signedUrl;
  }

  return {
    data: contact,
  };
}
