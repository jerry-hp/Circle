import LikeService from "../services/likeService";
import { Request, Response } from "express";

export default new (class LikeController {
  async find(req: Request, res: Response) {
    return await LikeService.find(req, res);
  }
  async like(req: Request, res: Response) {
    return await LikeService.like(req, res);
  }
})();
