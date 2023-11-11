import * as express from "express";
import followController from "../controllers/followController";
import AuthenticationMiddlewares from "../middlewares/auth";

const router = express.Router();

router.post("/follow/:id", AuthenticationMiddlewares.Authentication, followController.follow);

export default router;
