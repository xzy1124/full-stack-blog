import express from 'express';
import { getPostComments, addComments, deleteComments } from '../controller/comment.controller.js';
const router = express.Router()

router.get('/:postId', getPostComments)
router.post('/:postId', addComments)
router.delete('/:id', deleteComments)
export default router
