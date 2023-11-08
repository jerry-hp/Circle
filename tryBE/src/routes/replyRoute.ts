import replyController from "../controllers/replyController";
import * as express from "express";
import FileUpload from "../middlewares/uploadFIle";

const router = express.Router();
const UploadMiddleWare = new FileUpload("image");

router.get("/replies", replyController.find);
router.post("/reply", UploadMiddleWare.handleUpload.bind(UploadMiddleWare), replyController.create);
router.delete("/reply/:id", replyController.delete);

export default router;
