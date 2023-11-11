import { Request, Response } from "express";
import followEntitty from "../services/followService";

export default new (class FollowController {
  find(req: Request, res: Response) {
    followEntitty.find(req, res);
  }
  create(req: Request, res: Response) {
    followEntitty.create(req, res);
  }
  delete(req: Request, res: Response) {
    followEntitty.delete(req, res);
  }
})();
