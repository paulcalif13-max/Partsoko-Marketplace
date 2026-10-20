import express from 'express';
import { getMechanics } from '../controllers/mechanicController';

const router = express.Router();

router.get('/', getMechanics);

export default router;
