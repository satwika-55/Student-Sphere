import { Router } from "express";
import { chatWithGitaGPT } from "../controllers/gita.controller.js";

const router = Router();

router.post("/chat", chatWithGitaGPT);

export default router;