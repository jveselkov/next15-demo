import Link from 'next/link';
import type { ReactNode } from 'react';

import { authRoutes } from '@/lib/router';

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
