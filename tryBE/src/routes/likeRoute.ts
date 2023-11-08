import likeController from "../controllers/likeController";
import * as express from "express";

const router = express.Router();

router.get("/likes", likeController.find);
router.post("/like", likeController.like);

export default router;
