import type { Metadata } from 'next';

import { InfoLayout } from '@/common/layouts/InfoLayout';

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
  return <InfoLayout>{children}</InfoLayout>;
}
