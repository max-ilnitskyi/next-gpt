import React, {
  forwardRef,
  ForwardedRef,
  MouseEvent,
  ReactNode,
  useCallback,
} from 'react';

import { Loading } from '../Loading';

type BaseButtonHelperOnClick = (e: MouseEvent<HTMLButtonElement>) => void;

interface BaseButtonHelperProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  onClick: BaseButtonHelperOnClick;
}

function _BaseButtonHelper(
  { className, disabled, loading, children, onClick }: BaseButtonHelperProps,
  ref?: ForwardedRef<HTMLButtonElement>,
) {
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
      ref={ref}
      className={className}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading ? <Loading iconClassName="w-8 h-8 animate-spin" /> : children}
    </button>
  );
}

export const BaseButtonHelper = forwardRef(_BaseButtonHelper);
