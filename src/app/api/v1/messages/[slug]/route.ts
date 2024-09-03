import { NextRequest, NextResponse } from 'next/server';

import { MessageService } from '@/server/models/message/message.service';

import { processError } from '@/server/utils/exceptions/processError';
import { BackendAuth } from '@/server/auth/BackendAuth';
import { NotFoundException } from '@/server/utils/exceptions/NotFoundException';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { currentUserId } = await BackendAuth.getCurrentUserIdRequired();

    const deleteResult = await MessageService.delete({
      id: Number(params.slug),
      userId: currentUserId,
    });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(
        'Message not found or you are not authorized to delete this message',
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return processError({ error: error as Error });
  }
}
