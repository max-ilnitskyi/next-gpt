import { NextApiRequest, NextApiResponse } from 'next';
// import { User } from '@/api/models/user/user.entity';
import { AppDataSource } from '@/api/database/data-source';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // const newUser = new User();

    // const response = await AppDataSource.manager.save(newUser);

    console.log('===AppDataSource: ', AppDataSource); // temp
    return res.json({ data: 'Hello world' });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
