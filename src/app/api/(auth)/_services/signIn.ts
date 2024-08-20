import bcrypt from 'bcrypt';
import { z } from 'zod';

import { getDb } from '@/lib/mongo';
import { createSession } from '@/lib/session';

const dataScheme = z.object({
  username: z.string().trim().min(1, 'Username is required.'),
  password: z.string().trim().min(1, 'Password is required.'),
});

export async function signIn(data: z.input<typeof dataScheme>) {
  const db = await getDb();

  const parsedData = dataScheme.parse(data);

  const user = await db.collection('users').findOne({
    username: parsedData.username,
  });

  if (!user) {
    throw new Error('Username or password is incorrect.');
  }

  if (!(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Username or password is incorrect.');
  }

  await createSession(user._id.toString());
}
