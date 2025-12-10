import express from 'express';
const router = express.Router()
router.get('/saved', getUserSavedPosts)
router.patch('/save', savePost)
export default router
