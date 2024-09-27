import { QueryClient } from '@tanstack/react-query';
import { MessageCacheKey } from '@/main/message/MessageCacheKey';
import { MessageService } from '@/server/models/message/message.service';
import { ResponseFormatter } from '@/server/utils/ResponseFormatter';
import { BackendAuth } from '@/server/auth/BackendAuth';

import { MY_MESSAGES_DEFAULT_PARAMS } from '@/main/message/messageConstants';
import { MessageTypes } from '@/server/models/message/message.types';

const scope = 'messages';
const options = MY_MESSAGES_DEFAULT_PARAMS;

export async function myMessagesRQPrefetch(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: [MessageCacheKey.index(), options],
    queryFn: async () => {
      const { currentUserId } = await BackendAuth.getCurrentUserId();

      if (!currentUserId) {
        return { success: true, [scope]: { nodes: [] } };
      }

      const hardFilters = {
        userId: currentUserId,
        type: MessageTypes.USER_MESSAGE,
      };

      const response = await MessageService.find({
        ...options,
        filters: { ...options.filters, ...hardFilters },
      });

      return ResponseFormatter.index({ scope, nodes: response });
    },
  });
}
