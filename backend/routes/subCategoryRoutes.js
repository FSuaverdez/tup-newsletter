import express from 'express';
import {
  addSubCategory,
  getSubCategories,
  getSubCategoriesByCategory,
  getSubCategory,
  addPermission,
  getSubCategoryUserPermissions,
  editSubCategory,
  addSubscriber,
  removeSubscriber,
} from '../controllers/subCategoryController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addSubCategory);
router.post('/subscribe', requireAuth, addSubscriber);
router.put('/unsubscribe', requireAuth, removeSubscriber);
router.put('/edit/:id', requireAuth, editSubCategory);
router.post('/addPermission', requireAuth, addPermission);
router.get('/:id/userPermissions', getSubCategoryUserPermissions);
router.get('/getAll', getSubCategories);
router.get('/getAll/:id', getSubCategoriesByCategory);
router.get('/:id', getSubCategory);

export default router;
