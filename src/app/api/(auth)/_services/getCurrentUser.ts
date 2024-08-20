import { getSession } from '@/lib/session';

import { getUser } from './getUser';

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await getUser(session.userId);

  if (!user) {
    return null;
  }

  // @ts-ignore
  delete user.password;

  return user;
}
