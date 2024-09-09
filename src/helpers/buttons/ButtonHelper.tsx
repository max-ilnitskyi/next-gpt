import React, { memo } from 'react';
import { BaseButtonHelper } from './BaseButtonHelper';

interface ButtonHelperProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  onClick: () => void;
}

function _ButtonHelper({
  className,
  disabled,
  loading,
  text,
  onClick,
}: ButtonHelperProps) {
  return (
    <BaseButtonHelper
      className={className}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {text ? <span>{text}</span> : null}
    </BaseButtonHelper>
  );
}

export const ButtonHelper = memo(_ButtonHelper);
