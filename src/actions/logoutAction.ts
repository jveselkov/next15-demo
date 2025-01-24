'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { invalidateSession, sessionCookieName } from '@/lib/auth/session';
import { authRoutes } from '@/lib/router';

export async function logoutAction() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(sessionCookieName)?.value;

  if (sessionId === undefined) {
    redirect(authRoutes.Login);
  }

  await invalidateSession(sessionId);
  cookieStore.delete(sessionCookieName);

  redirect(authRoutes.Login);
}
