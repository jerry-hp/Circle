import { Request, Response } from "express";
import FollowService from "../services/followService";

export default new (class FollowController {

    async find(req: Request, res: Response) {
      return await FollowService.find(req, res);
    }
  async create(req: Request, res: Response) {
    return await FollowService.create(req, res);
  }
})();
