import { NextRequest, NextResponse } from 'next/server';

import { MessageTypes } from '@/server/models/message/message.types';
import { MessageService } from '@/server/models/message/message.service';

import { processError } from '@/server/utils/exceptions/processError';
// import { ParseIndexQuery } from '@/server/utils/ParseIndexQuery';
import { ResponseFormatter } from '@/server/utils/ResponseFormatter';

const scope = 'messages';
const hardFilters = { type: MessageTypes.EXAMPLE };

// TODO remove or setup properly in case of params usage
export const dynamic = 'force-static';

const EXAMPLE_MESSAGES_DEFAULT_PARAMS = {
  page: 1,
  limit: 24,
  filters: {},
  sort: ['CREATED_AT_DESC'],
};

export async function GET(request: NextRequest) {
  try {
    // const options = new ParseIndexQuery(request).parse();
    const options = EXAMPLE_MESSAGES_DEFAULT_PARAMS;

    const response = await MessageService.find({
      ...options,
      filters: { ...options.filters, ...hardFilters },
    });

    return NextResponse.json(
      ResponseFormatter.index({ scope, nodes: response }),
    );
  } catch (error) {
    return processError({ error: error as Error });
  }
}
