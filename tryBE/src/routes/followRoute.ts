import * as express from "express";
import followController from "../controllers/followController";

const router = express.Router();

router.get("/follows", followController.find);
router.post("/follow", followController.create);
router.delete("/follow", followController.delete);

export default router;
