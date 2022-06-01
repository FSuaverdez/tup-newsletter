import express from 'express';
import {
  addMobile,
  editMobile,
  getAllUsers,
  getUser,
  getUserPermissions,
  userAuth,
  deleteUser,
  updateUserRole,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/update/:id', requireAuth, updateUserRole);
router.get('/getAll', getAllUsers);
router.post('/auth', userAuth);
router.get('/:id', getUser);
router.delete('/remove/:id', requireAuth, deleteUser);
router.post('/mobile/add/:id', addMobile);
router.put('/mobile/edit/:id', editMobile);
router.get('/auth/permissions/:id', getUserPermissions);

export default router;
