import express from 'express';
import {
  addCategory,
  getCategories,
  getCategory,
} from '../controllers/categoryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addCategory);
router.get('/getAll', getCategories);
router.get('/:id', getCategory);

export default router;
