import express from 'express';
const router = express.Router()
router.get("/anthortest", (req, res) => {
    res.status(200).send("Author Test")
})
export default router
