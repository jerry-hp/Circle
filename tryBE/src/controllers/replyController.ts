import replyService from "../services/replyService";
import { Request, Response } from "express";

export default new (class ReplyController {
  async find(req: Request, res: Response) {
    return await replyService.find(req, res);
  }

  async create(req: Request, res: Response) {
    return await replyService.create(req, res);
  }

  async delete(req: Request, res: Response) {
    return await replyService.delete(req, res);
  }
})();
