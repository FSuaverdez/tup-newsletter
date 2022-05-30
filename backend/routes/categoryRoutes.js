import express from 'express';
import {
  addCategory,
  addPermission,
  addSubscriber,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
  getCategoryUserPermissions,
  removeSubscriber,
} from '../controllers/categoryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addCategory);
router.put('/edit/:id', requireAuth, editCategory);
router.delete('/delete/:id', requireAuth, deleteCategory);
router.post('/subscribe', requireAuth, addSubscriber);
router.put('/unsubscribe', requireAuth, removeSubscriber);
router.get('/getAll', getCategories);
router.get('/:id', getCategory);
router.get('/:id/userPermissions', getCategoryUserPermissions);
router.post('/addPermission', requireAuth, addPermission);

export default router;
