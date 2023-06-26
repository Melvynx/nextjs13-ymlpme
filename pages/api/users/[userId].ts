import type { NextApiRequest, NextApiResponse } from 'next';
import { db, User } from '~/src/store/store';
import { z } from 'zod';

type Data = {
  user: User | null;
};

const BodyScheme = z.object({
  name: z.string(),
  email: z.string(),
});

const QueryScheme = z.object({
  userId: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'PATCH') {
    console.log({ body: req.body });
    const user = BodyScheme.parse(JSON.parse(req.body));
    const query = QueryScheme.parse(req.query);

    const updatedUser: User = {
      id: Number(query.userId),
      ...user,
    };

    await db.users.update(updatedUser);

    res.status(200).json({ user: updatedUser });
  }

  if (req.method === 'POST') {
    const user = BodyScheme.parse(JSON.parse(req.body));

    const newUser = await db.users.add(user);

    res.status(201).json({ user: newUser });
  }

  if (req.method === 'DELETE') {
    const query = QueryScheme.parse(req.query);

    await db.users.delete(Number(query.userId));

    res.status(201).json({ user: null });
  }

  res.status(405).end();
}
