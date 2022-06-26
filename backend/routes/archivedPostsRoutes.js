import express from 'express';
import {
 archivePost,
 getAllArchivedPosts,
 getArchived,
 deleteArchived,
 archiveAllCategoryPost,
 archiveAllSubCategoryPost
} from '../controllers/archivedPostsController.js';

import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/archive/:id', requireAuth, archivePost);
router.delete('/delete/:id', requireAuth, deleteArchived);
router.get('/getAll/archived/:page', getAllArchivedPosts);
router.get('/get/:id', getArchived);
router.post('/all/category/:id', archiveAllCategoryPost);
router.post('/all/subcategory/:id', archiveAllSubCategoryPost);

export default router;
