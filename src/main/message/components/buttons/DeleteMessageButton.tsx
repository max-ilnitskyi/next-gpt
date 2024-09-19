import React, { memo } from 'react';

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

import { useShowToastOnErrorChange } from '@/common/hooks/useShowToastOnErrorChange';
import { useDeleteMessage } from '@/main/message/hooks/useDeleteMessage';

import { BaseButtonHelper } from '@/helpers/buttons/BaseButtonHelper';
import { strings } from '@/texts';

interface DeleteMessageButtonProps {
  messageId?: number;
  className?: string;
  iconClassName?: string;
  cacheKeys?: string[];
}

function _DeleteMessageButton({
  messageId,
  className,
  iconClassName,
  cacheKeys,
}: DeleteMessageButtonProps) {
  const {
    handleDeleteMessage,
    deleteMessageErrorMessage,
    deleteMessagePending,
  } = useDeleteMessage({ messageId, cacheKeys });

  useShowToastOnErrorChange({ error: deleteMessageErrorMessage });

  return (
    <BaseButtonHelper
      loading={deleteMessagePending}
      className={className}
      onClick={handleDeleteMessage}
    >
      <XMarkIcon className={iconClassName} />
      <span className="sr-only">{strings.deleteMessage}</span>
    </BaseButtonHelper>
  );
}

export const DeleteMessageButton = memo(_DeleteMessageButton);
