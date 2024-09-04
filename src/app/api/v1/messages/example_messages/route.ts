import { NextRequest, NextResponse } from 'next/server';

import { MessageTypes } from '@/server/models/message/message.types';
import { MessageService } from '@/server/models/message/message.service';

import { processError } from '@/server/utils/exceptions/processError';
import { BackendAuth } from '@/server/auth/BackendAuth';
import { ParseIndexQuery } from '@/server/utils/ParseIndexQuery';

const scope = 'messages';
const hardFilters = { type: MessageTypes.EXAMPLE };

export async function GET(request: NextRequest) {
  try {
    await BackendAuth.getCurrentUserIdRequired();

    const options = new ParseIndexQuery(request).parse();

    const response = await MessageService.find({
      ...options,
      filters: { ...options.filters, ...hardFilters },
    });

    return NextResponse.json({ success: true, [scope]: response });
  } catch (error) {
    return processError({ error: error as Error });
  }
}
