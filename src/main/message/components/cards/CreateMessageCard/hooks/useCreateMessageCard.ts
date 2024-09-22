import React, { useCallback, useState } from 'react';

import { useCreateMessage } from '@/main/message/hooks/useCreateMessage';
import {
  useMessagesCount,
  cacheKey,
} from '@/main/message/hooks/useMessagesCount';

import { useCreateMessageCardGenerateContent } from './useCreateMessageCardGenerateContent';

const cacheKeys = [cacheKey];

export function useCreateMessageCard() {
  const [text, setText] = useState<string>('');

  const {
    message,
    createMessage,
    createMessageErrorMessage,
    createMessagePending,
    resetCreateMessage,
  } = useCreateMessage({ cacheKeys });

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

  const {
    generateMessageContentErrorMessage,
    generateMessageContentPending,
    handleGenerateNeutralMessageContent,
    handleGeneratePositiveMessageContent,
    handleGenerateNegativeMessageContent,
  } = useCreateMessageCardGenerateContent({ afterSuccess: setText });

  const { messagesCount } = useMessagesCount();

  return {
    messagesCount,
    text,
    message,
    handleAnalyzeMessage,
    createMessageErrorMessage,
    createMessagePending,
    resetCreateMessage,
    handleTextareaKeyDown,
    handleTextareaChange,
    generateMessageContentErrorMessage,
    generateMessageContentPending,
    handleGenerateNeutralMessageContent,
    handleGeneratePositiveMessageContent,
    handleGenerateNegativeMessageContent,
  };
}
