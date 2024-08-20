import bcrypt from 'bcrypt';
import { z } from 'zod';

import { getDb } from '@/lib/mongo';
import { createSession } from '@/lib/session';

const dataScheme = z.object({
  username: z.string().trim().min(1, 'Username is required.'),
  password: z.string().min(8, 'Password must contain at least 8 character(s)'),
});

export async function signUp(data: z.input<typeof dataScheme>) {
  const db = await getDb();

  const parsedData = dataScheme.parse(data);

  const found = await db.collection('users').findOne({
    username: parsedData.username,
  });

  if (found) {
    throw new Error('Username already taken.');
  }

  const hash = await bcrypt.hash(data.password, 10);

  const user = await db.collection('users').insertOne({
    username: parsedData.username,
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await createSession(user.insertedId.toString());
}
