import { NextRequest, NextResponse } from 'next/server';

import { MessageService } from '@/server/models/message/message.service';

import { processError } from '@/server/utils/exceptions/processError';
import { BackendAuth } from '@/server/auth/BackendAuth';
import { ParseIndexQuery } from '@/server/utils/ParseIndexQuery';
import { MessageTypes } from '@/server/models/message/message.types';

const scope = 'messagesCount';

export async function GET(request: NextRequest) {
  try {
    const { currentUserId } = await BackendAuth.getCurrentUserId();

    if (!currentUserId) {
      return NextResponse.json({ success: true, [scope]: { count: 0 } });
    }

    const options = new ParseIndexQuery(request).parse();

    const hardFilters = {
      userId: currentUserId,
      type: MessageTypes.USER_MESSAGE,
    };

    const count = await MessageService.count({
      ...options,
      filters: { ...options.filters, ...hardFilters },
    });

    return NextResponse.json({ success: true, [scope]: { count } });
  } catch (error) {
    return processError({ error: error as Error });
  }
}
