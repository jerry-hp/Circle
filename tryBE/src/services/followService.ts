import { Repository } from "typeorm";
import { Follow } from "../entities/followEntity";
import { AppDataSource } from "../data-source";
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
      console.log({ follow });
      return res.status(200).json({ follow });
    } catch (err) {
      return res.status(500).json({ message: "error while getting follow" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const follow = req.body;

      //check if user already follows, if not: create
      const { following_id, follower_id } = follow;
      const existingFollow = await this.followRepository.findOne({ where: { following_id, follower_id } });

      if (existingFollow) {
        await this.followRepository.remove(existingFollow);
        return res.status(200).json({ message: "unfollowed" });
      } else {
        const newFollow = this.followRepository.create(follow);
        await this.followRepository.save(newFollow);
        return res.status(200).json(newFollow);
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
})();
