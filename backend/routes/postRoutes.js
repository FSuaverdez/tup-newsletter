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
  getPostBySearch,
  getAllHomePosts,
  deleteComment,
  getRecommendedPosts,
  getNotifications,
  featurePost,
  getAllFeaturedPosts,
} from '../controllers/postController.js';

import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addPost);
router.put('/edit/:id', requireAuth, editPost);
router.put('/approve/:id', requireAuth, approvePost);
router.post('/comment/:id', requireAuth, addComment);
router.delete('/comment/delete', deleteComment);
router.delete('/delete/:id', requireAuth, deletePost);
router.get('/getAll/home/:page', getAllHomePosts);
router.get('/getAll', getAllPosts);
router.get('/getAll/category/:id/:page', getAllPostsByCategory);
router.get('/getAll/subcategory/:id/:page', getAllPostsBySubCategory);
router.get('/get/:id', getPost);
router.get('/recommended/:postId', getRecommendedPosts);
router.get('/notifications', getNotifications);
router.get('/email', testMail);
router.get('/sms', testSMS);
router.get('/search', getPostBySearch);
router.put('/feature/:id/:action', requireAuth,featurePost);
router.get('/getAll/featured', getAllFeaturedPosts);

export default router;
