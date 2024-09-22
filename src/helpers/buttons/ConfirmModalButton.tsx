import React, { ReactNode, useCallback } from 'react';
import isFunction from 'lodash/isFunction';

import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';

import { ButtonHelper } from './ButtonHelper';
import { BaseModalButton } from './BaseModalButton';
import { AlertMessage } from '../AlertMessage';

import { strings } from '@/texts';

interface BaseButtonHelperProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  errorMessage?: string | null;
  children: ReactNode;
  confirmText: string;
  onSubmit: () => Promise<unknown>;
}

export function ConfirmModalButton({
  className,
  disabled,
  loading,
  errorMessage,
  children,
  confirmText,
  onSubmit,
}: BaseButtonHelperProps) {
  const handleSubmit = useCallback<
    ({ onClose }: { onClose: () => void }) => void
  >(
    ({ onClose }) => {
      const submitResult = onSubmit();
      if (isFunction(submitResult.then)) {
        submitResult.then(() => {
          onClose();
        });
      } else {
        onClose();
      }
    },
    [onSubmit],
  );

  return (
    <BaseModalButton
      className={className}
      loading={loading}
      disabled={disabled}
      modalChildren={({ onClose }) => (
        <>
          <ExclamationCircleIcon className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {confirmText}
          </h3>
          <AlertMessage message={errorMessage} />
          <ButtonHelper
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            disabled={disabled || loading}
            onClick={() => handleSubmit({ onClose })}
            text={strings.yesImSure}
          />
          <ButtonHelper
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            text={strings.noCancel}
            onClick={onClose}
          />
        </>
      )}
    >
      {children}
    </BaseModalButton>
  );
}
