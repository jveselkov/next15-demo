'use client';
import { type ReactNode, useEffect } from 'react';

import { checkSession } from '@/actions/checkSessionAction';
import { logoutAction } from '@/actions/logoutAction';

export default function TodosLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <nav className="flex">
        <button onClick={logoutAction}>Logout</button>
      </nav>

      <main>{children}</main>
    </>
  );
}
