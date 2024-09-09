import { NextRequest, NextResponse } from 'next/server';
import camelcaseKeys from 'camelcase-keys';

import { Message } from '@/server/models/message/message.entity';
import { MessageService } from '@/server/models/message/message.service';

import { processError } from '@/server/utils/exceptions/processError';
import { analyzeMessage } from '@/server/openAi/actions/analyzeMessage';
import { ServerException } from '@/server/utils/exceptions/ServerException';
import { BackendAuth } from '@/server/auth/BackendAuth';
import { ParseIndexQuery } from '@/server/utils/ParseIndexQuery';
import { MessageTypes } from '@/server/models/message/message.types';

const scope = 'messages';
const scopeSingular = 'message';

export async function GET(request: NextRequest) {
  try {
    const { currentUserId } = await BackendAuth.getCurrentUserIdRequired();

    const options = new ParseIndexQuery(request).parse();

    const hardFilters = {
      userId: currentUserId,
      type: MessageTypes.USER_MESSAGE,
    };

    const response = await MessageService.find({
      ...options,
      filters: { ...options.filters, ...hardFilters },
    });

    return NextResponse.json({ success: true, [scope]: response });
  } catch (error) {
    return processError({ error: error as Error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { currentUserId } = await BackendAuth.getCurrentUserIdRequired();

    const body = await request.json();

    const content = body?.content;

    if (!content) {
      throw new ServerException('content field is required');
    }

    const response = await analyzeMessage(content);

    const newMessage = new Message();
    newMessage.user_id = currentUserId;
    newMessage.content = content;
    newMessage.valence = response.valence;
    newMessage.arousal = response.arousal;
    const message = await MessageService.create(newMessage);

    return NextResponse.json({
      success: true,
      [scopeSingular]: camelcaseKeys({ ...message }),
    });
  } catch (error) {
    return processError({ error: error as Error });
  }
}
