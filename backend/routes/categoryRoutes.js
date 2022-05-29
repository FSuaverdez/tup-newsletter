import express from 'express';
import {
  addCategory,
  addPermission,
  editCategory,
  getCategories,
  getCategory,
  getCategoryUserPermissions,
} from '../controllers/categoryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addCategory);
router.put('/edit/:id', requireAuth, editCategory);
router.get('/getAll', getCategories);
router.get('/:id', getCategory);
router.get('/:id/userPermissions', getCategoryUserPermissions);
router.post('/addPermission', requireAuth, addPermission);

export default router;
