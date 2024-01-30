import express from "express";
import { BlogController } from "../../controller/blog.controller";

const router = express.Router();

router.post("/", BlogController.addBlog);

router.get("/", BlogController.getBlogs);

router.get("/:id", BlogController.getBlog);

router.patch("/:id", BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);

export default router;
