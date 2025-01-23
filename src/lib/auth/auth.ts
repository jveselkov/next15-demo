import { hash, verify } from '@node-rs/argon2';
import { generateRandomString } from '@oslojs/crypto/random';
import { eq } from 'drizzle-orm';

import { db, table } from '@/lib/db';

import { createSession } from './session';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

export function generateUserId(length = 21): string {
  return generateRandomString({ read: (bytes) => crypto.getRandomValues(bytes) }, alphabet, length);
}

export function validateUsername(username: unknown): username is string {
  return (
    typeof username === 'string' && username.length >= 3 && username.length <= 31 && /^[a-z0-9_-]+$/.test(username)
  );
}

export function validatePassword(password: unknown): password is string {
  return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

export interface AuthData {
  username: string;
  password: string;
}

export async function registerUser({ username, password }: AuthData) {
  if (!validateUsername(username)) {
    return { errorMessage: 'Invalid username' };
  }
  if (!validatePassword(password)) {
    return { errorMessage: 'Invalid password' };
  }

  const userId = generateUserId();
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  try {
    await db.insert(table.user).values({ id: userId, username, passwordHash });

    const session = await createSession(userId);

    return { session };
  } catch (_e) {
    return { errorMessage: 'An error has occurred' };
  }
}

export async function loginUser({ username, password }: AuthData) {
  const results = await db.select().from(table.user).where(eq(table.user.username, username));

  const existingUser = results.at(0);

  if (!existingUser) {
    return { errorMessage: 'Incorrect username or password' };
  }

  const validPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return { errorMessage: 'Incorrect username or password' };
  }

  const session = await createSession(existingUser.id);

  return { session };
}
