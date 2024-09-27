import { QueryClient } from '@tanstack/react-query';
import { MessageCacheKey } from '@/main/message/MessageCacheKey';
import { BackendAuth } from '@/server/auth/BackendAuth';
import { MessageService } from '@/server/models/message/message.service';
import { ResponseFormatter } from '@/server/utils/ResponseFormatter';

const messagesCountScope = 'messagesCount';

export async function appRQPrefetch(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: [MessageCacheKey.count()],
    queryFn: async () => {
      const { currentUserId } = await BackendAuth.getCurrentUserId();

      if (!currentUserId) {
        return ResponseFormatter.count({ count: 0, scope: messagesCountScope });
      }

      const count = await MessageService.userMessagesCount({
        userId: currentUserId,
      });

      return ResponseFormatter.count({ count, scope: messagesCountScope });
    },
  });
}
