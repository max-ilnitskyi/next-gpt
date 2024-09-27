import { QueryClient } from '@tanstack/react-query';
import { MessageCacheKey } from '@/main/message/MessageCacheKey';
import { MessageService } from '@/server/models/message/message.service';
import { ResponseFormatter } from '@/server/utils/ResponseFormatter';

import { EXAMPLE_MESSAGES_DEFAULT_PARAMS } from '@/main/message/messageConstants';
import { MessageTypes } from '@/server/models/message/message.types';

const scope = 'messages';
const hardFilters = { type: MessageTypes.EXAMPLE };
const options = EXAMPLE_MESSAGES_DEFAULT_PARAMS;

export async function examplesRQPrefetch(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: [MessageCacheKey.example(), options],
    queryFn: async () => {
      const response = await MessageService.find({
        ...options,
        filters: { ...options.filters, ...hardFilters },
      });

      return ResponseFormatter.index({ scope, nodes: response });
    },
  });
}
