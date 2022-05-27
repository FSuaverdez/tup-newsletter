import express from 'express';
import {
  addComment,
  addPost,
  editPost,
  getAllPosts,
  getPost,
} from '../controllers/postController.js';

import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addPost);
router.put('/edit/:id', requireAuth, editPost);
router.post('/comment/:id', requireAuth, addComment);
router.get('/getAll', getAllPosts);
router.get('/get/:id', getPost);

export default router;
