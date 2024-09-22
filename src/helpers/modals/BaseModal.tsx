import React, { ReactNode } from 'react';
import isFunction from 'lodash/isFunction';
import { Modal } from '@mui/base/Modal';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

import { BaseButtonHelper } from '../buttons/BaseButtonHelper';

const ModalBackdrop = React.forwardRef<HTMLDivElement>(
  function _ModalBackdrop(props, ref) {
    return (
      <div
        ref={ref}
        {...props}
        className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"
      />
    );
  },
);

interface BaseModalProps {
  open?: boolean;
  children: ReactNode | ((options: { onClose: () => void }) => ReactNode);
  onClose: () => void;
}

export function BaseModal({ open, children, onClose }: BaseModalProps) {
  return (
    <Modal
      open={!!open}
      slots={{ backdrop: ModalBackdrop }}
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
      onClose={onClose}
    >
      <div className="z-50 relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <BaseButtonHelper
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <XMarkIcon className="size-6" />
            <span className="sr-only">Close modal</span>
          </BaseButtonHelper>
          <div className="p-4 md:p-5 text-center">
            {isFunction(children) ? children({ onClose }) : children}
          </div>
        </div>
      </div>
    </Modal>
  );
}
