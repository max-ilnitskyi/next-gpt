import React, { ReactNode } from 'react';

import { useBaseTooltipHelper } from './useBaseTooltipHelper';

interface BaseTooltipHelperProps {
  className?: string;
  contentClassName?: string;
  children: ReactNode;
  content: ReactNode;
}

export function BaseTooltipHelper({
  className,
  contentClassName,
  children,
  content,
}: BaseTooltipHelperProps) {
  const { isOpen, refs, floatingStyles, getReferenceProps, getFloatingProps } =
    useBaseTooltipHelper();

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
      >
        {children}
      </div>
      {isOpen ? (
        <div
          className={contentClassName}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {content}
        </div>
      ) : null}
    </>
  );
}
