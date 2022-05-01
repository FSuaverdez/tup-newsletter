import express from 'express';
import {
  addSubCategory,
  getSubCategories,
  getSubCategoriesByCategory,
  getSubCategory,
} from '../controllers/subCategoryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addSubCategory);
router.get('/getAll', getSubCategories);
router.get('/getAll/:id', getSubCategoriesByCategory);
router.get('/:id', getSubCategory);

export default router;
