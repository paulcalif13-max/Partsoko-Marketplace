import { Router } from 'express';
import { reportBug } from '../controllers/bugController';

const router = Router();

router.post('/report', reportBug);

export default router;
