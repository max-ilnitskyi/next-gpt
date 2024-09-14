import { useCallback } from 'react';

import { GenerateMessageContentTypes } from '@/main/message/messageTypes';

import { useGenerateMessageContent } from '@/main/message/hooks/useGenerateMessageContent';

interface CreateMessageCardGenerateContentOptions {
  afterSuccess: (content: string) => void;
}

export function useCreateMessageCardGenerateContent({
  afterSuccess,
}: CreateMessageCardGenerateContentOptions) {
  const {
    generateMessageContent,
    generateMessageContentErrorMessage,
    generateMessageContentPending,
  } = useGenerateMessageContent({});

  const handleGenerateMessageContent = useCallback<
    (type: GenerateMessageContentTypes) => void
  >(
    (type) => {
      generateMessageContent({ type }).then((data) => {
        afterSuccess(data.generateMessageContent.content);
      });
    },
    [afterSuccess, generateMessageContent],
  );

  const handleGenerateNeutralMessageContent = useCallback<() => void>(() => {
    handleGenerateMessageContent(GenerateMessageContentTypes.NEUTRAL);
  }, [handleGenerateMessageContent]);

  const handleGeneratePositiveMessageContent = useCallback<() => void>(() => {
    handleGenerateMessageContent(GenerateMessageContentTypes.POSITIVE);
  }, [handleGenerateMessageContent]);

  const handleGenerateNegativeMessageContent = useCallback<() => void>(() => {
    handleGenerateMessageContent(GenerateMessageContentTypes.NEGATIVE);
  }, [handleGenerateMessageContent]);

  return {
    generateMessageContentErrorMessage,
    generateMessageContentPending,
    handleGenerateNeutralMessageContent,
    handleGeneratePositiveMessageContent,
    handleGenerateNegativeMessageContent,
  };
}
