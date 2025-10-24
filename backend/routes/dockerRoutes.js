import express from "express";
import {
  generateDockerfile,
  getAllRepos,
  pushToRepo,
} from "../controllers/dockerController.js";

const router = express.Router();

router.post("/generate", generateDockerfile);
router.get("/repos", getAllRepos);
router.post("/push", pushToRepo);

export default router;
