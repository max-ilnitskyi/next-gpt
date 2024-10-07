import React, { ReactNode } from 'react';

interface LoadingProps {
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
  loaded?: boolean;
}

export function Loading({
  children,
  className,
  iconClassName,
  loaded,
}: LoadingProps) {
  if (loaded) {
    return children;
  }
  return (
    <div
      className={
        className || 'h-full flex items-center justify-center text-gray-400'
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className={iconClassName || 'w-24 h-24 animate-spin'}
        role="status"
      >
        <path d="m16 3c-1.65625 0-3 1.34375-3 3s1.34375 3 3 3 3-1.34375 3-3-1.34375-3-3-3zm-7.0625 3.4375c-1.378906 0-2.5 1.121094-2.5 2.5s1.121094 2.5 2.5 2.5 2.5-1.121094 2.5-2.5-1.121094-2.5-2.5-2.5zm14.125 1.5c-.550781 0-1 .449219-1 1s.449219 1 1 1 1-.449219 1-1-.449219-1-1-1zm-17.0625 5.8125c-1.242187 0-2.25 1.007813-2.25 2.25 0 1.242188 1.007813 2.25 2.25 2.25 1.242188 0 2.25-1.007812 2.25-2.25 0-1.242187-1.007812-2.25-2.25-2.25zm20 1c-.691406 0-1.25.558594-1.25 1.25s.558594 1.25 1.25 1.25 1.25-.558594 1.25-1.25-.558594-1.25-1.25-1.25zm-17.0625 6.3125c-1.105469 0-2 .894531-2 2s.894531 2 2 2 2-.894531 2-2-.894531-2-2-2zm14.125.5c-.828125 0-1.5.671875-1.5 1.5s.671875 1.5 1.5 1.5 1.5-.671875 1.5-1.5-.671875-1.5-1.5-1.5zm-7.0625 2.6875c-.964844 0-1.75.785156-1.75 1.75s.785156 1.75 1.75 1.75 1.75-.785156 1.75-1.75-.785156-1.75-1.75-1.75z" />
      </svg>
    </div>
  );
}
