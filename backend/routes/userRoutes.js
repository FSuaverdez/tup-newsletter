import express from 'express';
import {
  addMobile,
  editMobile,
  getUser,
  getUserPermissions,
  userAuth,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/auth', userAuth);
router.get('/:id', getUser);
router.post('/mobile/add/:id', addMobile);
router.put('/mobile/edit/:id', editMobile);
router.get('/auth/permissions/:id', getUserPermissions);

export default router;
