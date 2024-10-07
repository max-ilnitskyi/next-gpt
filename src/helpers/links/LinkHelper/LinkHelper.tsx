import React, { memo } from 'react';
import { BaseLinkHelper } from '../BaseLinkHelper';

interface LinkHelperProps {
  className?: string;
  href: string;
  text?: string;
  onClick?: () => void;
}

function _LinkHelper({ className, href, text, onClick }: LinkHelperProps) {
  return (
    <BaseLinkHelper className={className} href={href} onClick={onClick}>
      {text ? <span>{text}</span> : null}
    </BaseLinkHelper>
  );
}

export const LinkHelper = memo(_LinkHelper);
