import { getSession } from '@/lib/session';

import { getUser } from './getUser';

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return getUser(session.userId);
}
