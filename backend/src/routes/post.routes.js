import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const PostRouter = Router();

PostRouter.post("/create-post", verifyJWT, postController.createPost);
PostRouter.get("/get-posts", postController.getAllPosts);
PostRouter.post("/like-post/:postId", verifyJWT, postController.toggleLike);
PostRouter.post("/add-comment/:postId", verifyJWT, postController.addComment);
PostRouter.get("/get-comments/:postId", postController.getComments);
// PostRouter.delete("/delete-comment/:postId/:commentId", verifyJWT, postController.deleteComment);
PostRouter.delete("/delete-post/:postId", verifyJWT, postController.deletePost);

export default PostRouter;