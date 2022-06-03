import express from 'express';
import {
  addComment,
  addPost,
  editPost,
  getAllPosts,
  getAllPostsByCategory,
  getAllPostsBySubCategory,
  getPost,
  approvePost,
  deletePost,
  testMail,
  testSMS,
} from '../controllers/postController.js';

import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addPost);
router.put('/edit/:id', requireAuth, editPost);
router.put('/approve/:id', requireAuth, approvePost);
router.post('/comment/:id', requireAuth, addComment);
router.delete('/delete/:id', requireAuth, deletePost);
router.get('/getAll', getAllPosts);
router.get('/getAll/category/:id', getAllPostsByCategory);
router.get('/getAll/subcategory/:id', getAllPostsBySubCategory);
router.get('/get/:id', getPost);
router.get('/email', testMail);
router.get('/sms', testSMS);

export default router;
