import { NextRequest, NextResponse } from 'next/server';

import { Message } from '@/server/models/message/message.entity';
import { MessageService } from '@/server/models/message/message.service';

import { processError } from '@/server/utils/exceptions/processError';
import { analyzeMessage } from '@/server/openAi/actions/analyzeMessage';
import { ServerException } from '@/server/utils/exceptions/ServerException';
import { BackendAuth } from '@/server/auth/BackendAuth';

export async function POST(request: NextRequest) {
  try {
    const { currentUserId } = await BackendAuth.getCurrentUserIdRequired();

    const body = await request.json();

    const message = body?.message;

    if (!message) {
      throw new ServerException('message field is required');
    }

    const response = await analyzeMessage(message);

    const newMessage = new Message();
    newMessage.user_id = currentUserId;
    newMessage.content = message;
    newMessage.valence = response.valence;
    newMessage.arousal = response.arousal;
    await MessageService.create(newMessage);

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return processError({ error: error as Error });
  }
}
