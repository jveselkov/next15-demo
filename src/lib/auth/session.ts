import { generateRandomString } from '@oslojs/crypto/random';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';

import { db, table } from '@/lib/db';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

function generateSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(userId: string): Promise<table.Session> {
  const token = generateSessionToken();
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: table.Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + DAY_IN_MS * 30),
  };

  await db.insert(table.session).values(session);

  return session;
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export async function validateSession(sessionId: string) {
  const [result] = await db
    .select({
      user: { id: table.user.id, username: table.user.username },
      session: table.session,
    })
    .from(table.session)
    .innerJoin(table.user, eq(table.session.userId, table.user.id))
    .where(eq(table.session.id, sessionId));

  if (!result) {
    return { session: null, user: null };
  }
  const { session, user } = result;

  const sessionExpired = Date.now() >= session.expiresAt.getTime();
  if (sessionExpired) {
    await db.delete(table.session).where(eq(table.session.id, session.id));
    return { session: null, user: null };
  }

  const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
  if (renewSession) {
    session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
    await db.update(table.session).set({ expiresAt: session.expiresAt }).where(eq(table.session.id, session.id));
  }

  return { session, user };
}

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

export type SessionValidationResult = Awaited<ReturnType<typeof validateSession>>;
