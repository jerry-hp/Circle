import * as express from "express";
import { Request, Response } from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/users", userController.find);
router.post("/register", userController.create);
router.post("/login", userController.login);
router.patch("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

export default router;
