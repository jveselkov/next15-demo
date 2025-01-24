'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { registerUser } from '@/lib/auth/auth';
import { sessionCookieName } from '@/lib/auth/session';
import { afterAuthRoute } from '@/lib/router';

export interface RegisterActionState {
  username?: string;
  password?: string;
  confirmPassword?: string;
  message?: string;
}
export async function registerAction(
  _prevState: RegisterActionState,
  queryData: FormData,
): Promise<RegisterActionState> {
  const username = queryData.get('name') as string;
  const password = queryData.get('password') as string;
  const confirmPassword = queryData.get('confirm_password') as string;

  const request = { username, password, confirmPassword };

  if (!username || !password || !confirmPassword) {
    return {
      ...request,
      message: 'please enter username, password and confirm password',
    };
  }

  if (password !== confirmPassword) {
    return {
      ...request,
      message: 'password and confirm password are not equal',
    };
  }

  const { session, errorMessage } = await registerUser({ username, password });

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
