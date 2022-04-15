import express from 'express';
import {
  addCategory,
  getCategories,
} from '../controllers/categoryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addCategory);
router.get('/getAll', getCategories);

export default router;
