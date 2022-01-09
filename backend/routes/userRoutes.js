import express from 'express'
import { userAuth } from '../controllers/authController.js'

const router = express.Router()

router.post('/auth', userAuth)

export default router
