import express from 'express';
import {
  addSubCategory,
  getSubCategories,
  getSubCategory,
} from '../controllers/subCategoryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addSubCategory);
router.get('/getAll', getSubCategories);
router.get('/:id', getSubCategory);

export default router;
