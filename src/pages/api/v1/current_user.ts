import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/api/models/user/user.entity';
import { UserService } from '@/api/models/user/user.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const newUser = new User();

    newUser.name = 'anonymous';

    const response = await UserService.create(newUser);

    return res.json(response);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
