import React, { MouseEvent, ReactNode, useCallback } from 'react';

type BaseButtonHelperOnClick = (e: MouseEvent<HTMLButtonElement>) => void;

interface BaseButtonHelperProps {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick: BaseButtonHelperOnClick;
}

export function BaseButtonHelper({
  children,
  className,
  disabled,
  onClick,
}: BaseButtonHelperProps) {
  const handleClick = useCallback<BaseButtonHelperOnClick>(
    (e) => {
      e.preventDefault();
      onClick?.(e);
    },
    [onClick],
  );

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
