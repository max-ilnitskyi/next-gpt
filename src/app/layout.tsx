import type { Metadata } from 'next';
import cl from 'classnames';
import { Source_Code_Pro } from 'next/font/google';

import { AppLayout } from '@/common/layouts/AppLayout';
import { AppProvider } from '@/common/AppProvider';

import { AppPublicIcons } from '@/common/AppPublicIcons';
import { pages } from '@/texts';
import '@/styles/globals.scss';

const inter = Source_Code_Pro({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: pages.home.title,
  description: pages.home.description,
  icons: {
    icon: AppPublicIcons.icon(),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body
        className={cl(
          'h-full relative overflow-hidden text-white',
          inter.className,
        )}
      >
        <AppProvider>
          <AppLayout>{children}</AppLayout>
        </AppProvider>
      </body>
    </html>
  );
}
