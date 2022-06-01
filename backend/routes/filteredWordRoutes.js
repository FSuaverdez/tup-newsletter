import express from 'express';
import {
  addFilteredWord,
  removeFilteredWord,
} from '../controllers/filteredWordController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', requireAuth, addFilteredWord);
router.delete('/remove/:id', requireAuth, removeFilteredWord);

export default router;
