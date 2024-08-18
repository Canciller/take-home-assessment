import { ObjectId } from 'mongodb';

import { avatarsBucket } from '@/lib/gcp/storage';
import { getDb } from '@/lib/mongo';

export async function deleteContact(id: string) {
  const db = await getDb();

  await db.collection('contacts').deleteOne({
    _id: new ObjectId(id),
  });

  const avatar = await db.collection('avatars').findOneAndDelete({
    contact: new ObjectId(id),
  });

  if (avatar?.path) {
    await avatarsBucket.file(avatar.path).delete();
  }
}
