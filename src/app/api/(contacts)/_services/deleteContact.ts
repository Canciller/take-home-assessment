import { ObjectId } from 'mongodb';

import { avatarsBucket } from '@/lib/gcp/storage';
import { getDb } from '@/lib/mongo';
import { getSession } from '@/lib/session';

export async function deleteContact(id: string) {
  const session = await getSession();

  if (!session) {
    throw new Error('Not authorized');
  }

  const db = await getDb();

  const contactsColl = db.collection('contacts');

  const contact = await contactsColl.findOne({
    owner: new ObjectId(session.userId),
    _id: new ObjectId(id),
  });

  if (!contact) {
    throw new Error('Contact not found.');
  }

  await contactsColl.deleteOne({
    _id: new ObjectId(id),
  });

  const avatar = await db.collection('avatars').findOneAndDelete({
    contact: new ObjectId(id),
  });

  if (avatar?.path) {
    await avatarsBucket.file(avatar.path).delete();
  }
}
