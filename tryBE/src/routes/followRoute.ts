import * as express from "express";
import followController from "../controllers/followController";
import AuthenticationMiddlewares from "../middlewares/auth";

const router = express.Router();

router.get("/follows", AuthenticationMiddlewares.Authentication, followController.find);
router.post("/follow", AuthenticationMiddlewares.Authentication, followController.create);

export default router;
import { Request, Response, NextFunction } from "express";
