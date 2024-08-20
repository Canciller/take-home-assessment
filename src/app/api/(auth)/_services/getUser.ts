import { ObjectId } from 'mongodb';

import { getDb } from '@/lib/mongo';

export type UserDocument = {
  _id: ObjectId;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getUser(id: string) {
  const db = await getDb();

  const user = await db.collection<UserDocument>('users').findOne({
    _id: new ObjectId(id),
  });

  return user;
}
