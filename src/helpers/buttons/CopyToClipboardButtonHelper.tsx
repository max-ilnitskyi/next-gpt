import React, { memo, useCallback } from 'react';
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';

import { BaseButtonHelper } from './BaseButtonHelper';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { Toast } from '@/utils/Toast';
import { words } from '@/texts';

interface CopyToClipboardButtonHelperProps {
  className?: string;
  iconClassName?: string;
  data: string;
}

function _CopyToClipboardButtonHelper({
  className,
  iconClassName,
  data,
}: CopyToClipboardButtonHelperProps) {
  const handleClick = useCallback<() => void>(() => {
    const copied = copyToClipboard(data);
    if (copied) {
      Toast.showSuccess(words.copied);
    }
  }, [data]);

  return (
    <BaseButtonHelper
      className={
        className || 'p-1.5 rounded hover:bg-gray-950 hover:bg-opacity-20'
      }
      onClick={handleClick}
    >
      <DocumentDuplicateIcon className={iconClassName || 'size-6'} />
    </BaseButtonHelper>
  );
}

export const CopyToClipboardButtonHelper = memo(_CopyToClipboardButtonHelper);
