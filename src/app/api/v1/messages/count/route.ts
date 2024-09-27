import { NextRequest, NextResponse } from 'next/server';

import { MessageService } from '@/server/models/message/message.service';

import { processError } from '@/server/utils/exceptions/processError';
import { BackendAuth } from '@/server/auth/BackendAuth';
import { ParseIndexQuery } from '@/server/utils/ParseIndexQuery';
import { ResponseFormatter } from '@/server/utils/ResponseFormatter';

const scope = 'messagesCount';

export async function GET(request: NextRequest) {
  try {
    const { currentUserId } = await BackendAuth.getCurrentUserId();

    if (!currentUserId) {
      return NextResponse.json(ResponseFormatter.count({ count: 0, scope }));
    }

    const options = new ParseIndexQuery(request).parse();

    const count = await MessageService.userMessagesCount({
      userId: currentUserId,
      options,
    });

    return NextResponse.json(ResponseFormatter.count({ count, scope }));
  } catch (error) {
    return processError({ error: error as Error });
  }
}
