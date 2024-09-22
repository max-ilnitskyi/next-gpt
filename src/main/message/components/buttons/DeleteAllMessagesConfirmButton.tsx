import React, { ReactNode } from 'react';

import { useDeleteAllMessages } from '@/main/message/hooks/useDeleteAllMessages';

import { ConfirmModalButton } from '@/helpers/buttons/ConfirmModalButton';
import { strings } from '@/texts';

interface DeleteAllMessagesConfirmButtonProps {
  className?: string;
  children: ReactNode;
  cacheKeys?: string[];
}

export function DeleteAllMessagesConfirmButton({
  className,
  children,
  cacheKeys,
}: DeleteAllMessagesConfirmButtonProps) {
  const {
    deleteAllMessages,
    deleteAllMessagesErrorMessage,
    deleteAllMessagesPending,
  } = useDeleteAllMessages({ cacheKeys });

  return (
    <ConfirmModalButton
      className={className}
      loading={deleteAllMessagesPending}
      errorMessage={deleteAllMessagesErrorMessage}
      confirmText={strings.areYouSureYouWantToDeleteAllMessages}
      onSubmit={deleteAllMessages}
    >
      {children}
    </ConfirmModalButton>
  );
}
