'use server';
import { invalidateSession, sessionCookieName } from '@/lib/auth/session';
import { authRoutes } from '@/lib/router';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(sessionCookieName);

  if (!sessionId) {
    redirect(authRoutes.Login);
  }

  await invalidateSession(sessionId.value);
  cookieStore.delete(sessionCookieName);

  redirect(authRoutes.Login);
}
