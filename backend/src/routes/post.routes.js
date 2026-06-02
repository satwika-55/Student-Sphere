import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const PostRouter = Router();

PostRouter.post("/create-post", verifyJWT, postController.createPost);
PostRouter.get("/get-all-posts", postController.getAllPosts);
PostRouter.post("/like-post/:postId", verifyJWT, postController.toggleLike);

export default PostRouter;