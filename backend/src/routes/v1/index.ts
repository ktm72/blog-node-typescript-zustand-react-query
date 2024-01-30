import express from "express";
import blogRoute from "./blog.route";
import commentRoute from "./comment.route";

const router = express.Router();

router.use("/blog", blogRoute);
router.use("/comment", commentRoute);

export default router;
