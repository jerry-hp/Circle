import { Request, Response } from "express";
import { Likes } from "../entities/likeEntity";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export default new (class LikeService {
  private readonly likeRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const likes = await this.likeRepository.find({ relations: ["thread", "user"], order: { id: "DESC" } });
      return res.status(200).json({ likes });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async like(req: Request, res: Response): Promise<Response> {
    try {
      const like = {
        thread: req.body.thread,
        user: req.body.user,
      };

      console.log(like);
      const dbLike = await this.likeRepository.find({
        where: { thread: req.body.thread, user: req.body.user },
      });
      //if already liked, do unlike
      if (dbLike.length > 0) {
        await this.likeRepository.remove(dbLike);
        return res.status(400).json({ message: "already unliked" });
      }

      //if not liked, do like
      const result = await this.likeRepository.save(like);
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
})();
