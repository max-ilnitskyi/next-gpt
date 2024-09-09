import React, { memo } from 'react';
import { BaseButtonHelper } from './BaseButtonHelper';

interface ButtonHelperProps {
  className?: string;
  disabled?: boolean;
  text?: string;
  onClick: () => void;
}

function _ButtonHelper({
  className,
  disabled,
  text,
  onClick,
}: ButtonHelperProps) {
  return (
    <BaseButtonHelper
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {text ? <span>{text}</span> : null}
    </BaseButtonHelper>
  );
}

export const ButtonHelper = memo(_ButtonHelper);
