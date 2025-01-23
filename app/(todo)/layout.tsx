'use client';
import { checkSession } from '@/actions/checkSessionAction';
import { logoutAction } from '@/actions/logoutAction';
import { useEffect, type ReactNode } from 'react';

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
