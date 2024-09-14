import React, { useCallback, useState } from 'react';

import { useCreateMessage } from '@/main/message/hooks/useCreateMessage';
import { useCreateMessageCardGenerateContent } from './useCreateMessageCardGenerateContent';

export function useCreateMessageCard() {
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

  const {
    generateMessageContentErrorMessage,
    generateMessageContentPending,
    handleGenerateNeutralMessageContent,
    handleGeneratePositiveMessageContent,
    handleGenerateNegativeMessageContent,
  } = useCreateMessageCardGenerateContent({ afterSuccess: setText });

  return {
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
