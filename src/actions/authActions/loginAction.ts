'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { loginUser } from '@/lib/auth/auth';
import { sessionCookieName } from '@/lib/auth/session';
import { afterAuthRoute } from '@/lib/router';

export interface LoginActionState {
  username?: string;
  password?: string;
  message?: string;
}
export async function loginAction(_prevState: LoginActionState, queryData: FormData): Promise<LoginActionState> {
  const username = queryData.get('name') as string;
  const password = queryData.get('password') as string;

  const request = { username, password };

  if (!username || !password) {
    return {
      ...request,
      message: 'please enter username and password',
    };
  }

  const { session, errorMessage } = await loginUser({ username, password });
  if (session && !errorMessage) {
    const cookieStore = await cookies();

    cookieStore.set(sessionCookieName, session.id, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      expires: session.expiresAt,
    });

    redirect(afterAuthRoute);
  }

  return {
    ...request,
    message: errorMessage,
  };
}
