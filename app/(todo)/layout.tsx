import { logoutAction } from '@/actions/logoutAction';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="flex">
        <button onClick={logoutAction}>Logout</button>
      </nav>

      <main>{children}</main>
    </>
  );
}
