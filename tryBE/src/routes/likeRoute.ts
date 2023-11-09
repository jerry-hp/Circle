import likeController from "../controllers/likeController";
import * as express from "express";
import AuthenticationMiddlewares from "../middlewares/auth";

const router = express.Router();

router.get("/likes", AuthenticationMiddlewares.Authentication, likeController.find);
router.post("/like", AuthenticationMiddlewares.Authentication, likeController.like);

export default router;
