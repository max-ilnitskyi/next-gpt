import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/api/models/user/user.entity';
import { AppDataSource } from '@/api/database/data-source';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const newUser = new User();

    const response = await AppDataSource.manager.save(newUser);
    return res.json(response);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
