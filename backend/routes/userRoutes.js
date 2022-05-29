import express from 'express';
import { getUserPermissions, userAuth } from '../controllers/authController.js';

const router = express.Router();

router.post('/auth', userAuth);
router.get('/auth/permissions/:id', getUserPermissions);

export default router;
