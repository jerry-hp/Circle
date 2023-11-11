import { AppDataSource } from "../data-source";
import Follow from "../entities/followEntity";
import { Repository } from "typeorm";
import { Request, Response } from "express";

export default new (class FollowService {
  private readonly followRepository: Repository<Follow> = AppDataSource.getRepository(Follow);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const follow = await this.followRepository.find({
        relations: {
          follower_id: true,
          following_id: true,
        },
      });

      return res.status(200).json({ follow });
    } catch (err) {
      return res.status(500).json({ message: "error while getting follow" });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { follower_id, following_id } = data;

      if (follower_id === following_id) {
        return res.status(400).json({ error: "Follower and following cannot be the same user." });
      }

      const newCreate = this.followRepository.create(data);

      await this.followRepository.save(newCreate);
      return res.status(201).json({ data: newCreate });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.body.id;
      console.log("delete", id);

      const findFollower = await this.followRepository.findOneBy({
        id,
      });
      if (!findFollower) {
        return res.status(404).json({ error: "not found" });
      }

      await this.followRepository.remove(findFollower);

      return res.status(200).json(findFollower);
    } catch (err) {
      return res.status(500).json({ error: "cannot delete" });
    }
  }
})();
