import './globals.css';

import type { ReactNode } from 'react';

export const metadata = {
  title: 'Todo app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
