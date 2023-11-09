import * as express from "express";
import userController from "../controllers/userController";
import AuthenticationMiddlewares from "../middlewares/auth";

const router = express.Router();

router.get("/users", userController.find);

//part of authentication
router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/auth/check", AuthenticationMiddlewares.Authentication, userController.check);

router.patch("/user/:id", AuthenticationMiddlewares.Authentication, userController.update);
router.delete("/user/:id", AuthenticationMiddlewares.Authentication, userController.delete);

export default router;
