import express from 'express';
import { getPosts, getPost, createPost, deletePost, uploadAuth, featurePost } from "../controller/post.controller.js"
const router = express.Router()
// 这些路由是按照书写顺序的，upload-auth写在上面是为了不和/:slug冲突
router.get('/upload-auth', uploadAuth)
router.get("/", getPosts)
router.get("/:slug", getPost)
router.post("/", createPost)
router.delete("/:id", deletePost)
router.patch('/feature', featurePost)
export default router
