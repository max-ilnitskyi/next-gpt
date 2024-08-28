import { NextRequest, NextResponse } from 'next/server';

import { User } from '@/api/models/user/user.entity';
import { UserService } from '@/api/models/user/user.service';

export async function GET(request: NextRequest) {
  const newUser = new User();

  newUser.name = 'anonymous';

  const response = await UserService.create(newUser);

  return NextResponse.json(response);
}
