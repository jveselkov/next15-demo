import { authRoutes } from '@/lib/router';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="flex">
        <Link href={authRoutes.Login}>Login</Link>
        <Link href={authRoutes.Register}>Register</Link>
      </nav>

      <main>{children}</main>
    </>
  );
}
