import express from 'express';
import {
 archivePost,
 getAllArchivedPosts,
 getArchived,
 deleteArchived
} from '../controllers/archivedPostsController.js';

import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/archive/:id', requireAuth, archivePost);
router.delete('/delete/:id', requireAuth, deleteArchived);
router.get('/getAll/archived/:page', getAllArchivedPosts);
router.get('/get/:id', getArchived);

export default router;
