'use server';
import { cookies } from 'next/headers';

import { sessionCookieName, validateSession } from '@/lib/auth/session';

import { logoutAction } from './authActions/logoutAction';

export async function checkSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(sessionCookieName)?.value;

  if (sessionId === undefined) {
    await logoutAction();

    return;
  }

  const { session } = await validateSession(sessionId);

  if (!session) {
    await logoutAction();
  }
}
