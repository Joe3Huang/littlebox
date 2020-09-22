import { Router } from 'express';
const router = Router();
router.get('/users', (req: any, res) => {
    res.send('Hello World');
});

export default router;
