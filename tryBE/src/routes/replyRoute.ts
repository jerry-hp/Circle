import replyController from "../controllers/replyController";
import * as express from "express";
import FileUpload from "../middlewares/uploadFIle";
import AuthenticationMiddlewares from "../middlewares/auth";

const router = express.Router();
const UploadMiddleWare = new FileUpload("image");

router.get("/replies", AuthenticationMiddlewares.Authentication, replyController.find);
router.post("/reply", AuthenticationMiddlewares.Authentication, UploadMiddleWare.handleUpload.bind(UploadMiddleWare), replyController.create);
router.delete("/reply/:id", AuthenticationMiddlewares.Authentication, replyController.delete);

export default router;
