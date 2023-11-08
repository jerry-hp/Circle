import ThreadService from "../services/threadService";
import { Request, Response } from "express";

export default new (class ThreadController {
  async find(req: Request, res: Response) {
    return await ThreadService.find(req, res);
  }

  async create(req: Request, res: Response) {
    return await ThreadService.create(req, res);
  }

  async delete(req: Request, res: Response) {
    return await ThreadService.delete(req, res);
  }
})();
