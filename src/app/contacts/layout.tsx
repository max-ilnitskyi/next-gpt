import type { Metadata } from 'next';

import { pages } from '@/texts';

export const metadata: Metadata = {
  title: pages.contacts.title,
  description: pages.contacts.description,
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
