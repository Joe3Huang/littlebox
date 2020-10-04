import { Router, Request, Response } from 'express';
import { User } from '../models/user/User';
const router = Router();

const users = [];

users.push(
    User.fromJSON({
        id: '123',
        email: 'Bruce@gmail.com',
        firstName: 'Bruce',
        lastName: 'Lee',
        phash: '123sdg4134',
        calendar: [],
        crytobox: [],
    }),
);

router.get('/users', (req: Request, res: Response) => {
    res.send('Hello World');
});

export default router;
