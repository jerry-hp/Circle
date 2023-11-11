import { Request, Response } from "express";
import FollowService from "../services/followService";

export default new (class FollowController {
  async follow(req: Request, res: Response) {
    return await FollowService.follow(req, res);
  }
})();
