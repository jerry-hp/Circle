import ThreadController from "../controllers/threadController";
import * as express from "express";
import FileUpload from "../middlewares/uploadFIle";
import AuthenticationMiddlewares from "../middlewares/auth";

const router = express.Router();
const UploadMiddleWare = new FileUpload("image");

router.get("/threads", AuthenticationMiddlewares.Authentication, ThreadController.find);
router.post("/thread", AuthenticationMiddlewares.Authentication, UploadMiddleWare.handleUpload.bind(UploadMiddleWare), ThreadController.create);
router.delete("/thread/:id", AuthenticationMiddlewares.Authentication, ThreadController.delete);

export default router;
