import { NextResponse } from 'next/server';

import { BackendAuth } from '@/server/auth/BackendAuth';
import { processError } from '@/server/utils/exceptions/processError';

export async function GET() {
  try {
    const { currentUserId } = await BackendAuth.getOrCreateUserId();

    const response = { id: currentUserId };

    return NextResponse.json({ success: true, currentUser: response });
  } catch (error) {
    return processError({ error: error as Error });
  }
}
