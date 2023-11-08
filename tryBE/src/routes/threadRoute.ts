import ThreadController from "../controllers/threadController";
import * as express from "express";
import FileUpload from "../middlewares/uploadFIle";


const router = express.Router();
const UploadMiddleWare = new FileUpload("image");

router.get("/threads", ThreadController.find);
router.post("/thread", UploadMiddleWare.handleUpload.bind(UploadMiddleWare), ThreadController.create);
router.delete("/thread/:id", ThreadController.delete);

export default router;
