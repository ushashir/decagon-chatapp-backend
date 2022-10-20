import express from "express"
import { createPost,updatePost,getSinglePost,deletePost,getAllPost } from "../controllers/postController";
const router = express.Router();

router.get("/",getAllPost)
router.get("/:id",getSinglePost)
router.post("/",createPost)
router.patch("/:id",updatePost)
router.delete("/:id", deletePost);



export default router