import React, { useCallback, useState } from 'react';

import { useCreateMessage } from '@/main/message/hooks/useCreateMessage';

import { MessageCard } from './MessageCard';

import { ButtonHelper } from '@/helpers/buttons/ButtonHelper';
import { AlertMessage } from '@/helpers/AlertMessage';

import { strings, words } from '@/texts';

export function CreateMessageCard() {
  const [text, setText] = useState<string>('');

  const {
    message,
    createMessage,
    createMessageErrorMessage,
    createMessagePending,
    resetCreateMessage,
  } = useCreateMessage({});

  const handleAnalyzeMessage = useCallback<() => void>(() => {
    if (!text) {
      return;
    }
    createMessage({ content: text }).then(() => {
      setText('');
    });
  }, [createMessage, text]);

  const handleTextareaKeyDown = useCallback<
    React.KeyboardEventHandler<HTMLTextAreaElement>
  >(
    (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        handleAnalyzeMessage();
      }
    },
    [handleAnalyzeMessage],
  );

  const handleTextareaChange = useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >((e) => {
    setText(e.target.value || '');
  }, []);

  return (
    <div className="w-full max-w-md">
      {!message ? (
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
          <div>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded mb-4"
              placeholder={strings.enterYourMessageHere}
              autoFocus
              value={text}
              onChange={handleTextareaChange}
              onKeyDown={handleTextareaKeyDown}
            />
            <ButtonHelper
              className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-blue-600"
              text={words.analyze}
              disabled={!text}
              loading={createMessagePending}
              onClick={handleAnalyzeMessage}
            />
            <AlertMessage message={createMessageErrorMessage} />
          </div>
        </div>
      ) : null}

      {message ? (
        <>
          <MessageCard message={message} />
          <ButtonHelper
            className="mt-4 w-full bg-gray-700 text-gray-100 py-2 rounded hover:bg-gray-800"
            text={words.reset}
            onClick={resetCreateMessage}
          />
        </>
      ) : null}
    </div>
  );
}
