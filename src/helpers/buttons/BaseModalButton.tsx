import React, { ReactNode, useState, useCallback } from 'react';

import { BaseModal } from '../modals/BaseModal';
import { BaseButtonHelper } from './BaseButtonHelper';

interface BaseModalButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  modalChildren: ReactNode | ((options: { onClose: () => void }) => ReactNode);
}

export function BaseModalButton({
  className,
  disabled,
  loading,
  children,
  modalChildren,
}: BaseModalButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = useCallback<() => void>(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback<() => void>(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <BaseButtonHelper
        disabled={disabled}
        loading={loading}
        className={className}
        onClick={handleOpen}
      >
        {children}
      </BaseButtonHelper>
      <BaseModal open={open} onClose={handleClose}>
        {modalChildren}
      </BaseModal>
    </>
  );
}
