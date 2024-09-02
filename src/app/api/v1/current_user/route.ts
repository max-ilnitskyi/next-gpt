import { NextResponse } from 'next/server';

import { BackendAuth } from '@/server/auth/BackendAuth';
import { processError } from '@/server/utils/exceptions/processError';

export async function GET() {
  try {
    const { currentUserId: existingCurrentUserId } =
      await BackendAuth.getCurrentUserId({});

    let currentUserId = existingCurrentUserId;

    if (!currentUserId) {
      const { currentUserId: newUserId } = await BackendAuth.setNewUserId();

      currentUserId = newUserId;
    }

    const response = { id: currentUserId };

    return NextResponse.json(response);
  } catch (error) {
    return processError({ error: error as Error });
  }
}
