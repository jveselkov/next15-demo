'use client';
import { type ReactNode } from 'react';

import { logoutAction } from '@/actions/authActions/logoutAction';

export default function TodosLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="flex">
        <button onClick={logoutAction}>Logout</button>
      </nav>

      <main>{children}</main>
    </>
  );
}
