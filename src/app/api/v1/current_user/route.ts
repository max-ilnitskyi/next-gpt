import { User } from '@/api/models/user/user.entity';
import { UserService } from '@/api/models/user/user.service';

export async function GET(request: Request) {
  const newUser = new User();

  newUser.name = 'anonymous';

  const response = await UserService.create(newUser);

  return Response.json(response);
}
