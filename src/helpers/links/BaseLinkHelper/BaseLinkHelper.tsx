import React, { ReactNode } from 'react';
import Link from 'next/link';

export interface BaseLinkHelperProps {
  className?: string;
  href: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function BaseLinkHelper({
  className,
  href,
  children,
  onClick,
}: BaseLinkHelperProps) {
  return (
    <Link className={className} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
