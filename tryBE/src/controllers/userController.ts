import userService from "../services/userService";
import { Request, Response } from "express";

export default new (class UserController {
  async find(req: Request, res: Response) {
    return await userService.find(req, res);
  }

  async create(req: Request, res: Response) {
    return await userService.create(req, res);
  }

  async login(req: Request, res: Response) {
    return await userService.login(req, res);
  }

  async check(req: Request, res: Response) {
    return await userService.check(req, res);
  }

  async update(req: Request, res: Response) {
    return await userService.update(req, res);
  }

  async delete(req: Request, res: Response) {
    return await userService.delete(req, res);
  }
})();
