import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/userEntity";
import { number } from "joi";

export default new (class FollowService {
  private readonly followRepository: Repository<User> = AppDataSource.getRepository(User);

  async follow(req: Request, res: Response): Promise<Response> {
    try {
      const idYgMauDIFollow = Number(req.params.id);

      const idUser = Number(req.body.idUser);
      const following = await this.followRepository.find({
        where: {
          id: idYgMauDIFollow,
        },
      });
      const followers = await this.followRepository.find({
        where: {
          id: idUser,
        },
      });

      //it doesnt work!! need to fix it
      if (following[0] === followers[0]) {
        return res.status(400).json({ error: "You can't follow yourself" });
      }

      //check if user is already following
      const isFollow = await this.followRepository.query(`select * from following where following_id=${idYgMauDIFollow} and follower_id=${idUser}`);
      //,if  following then unfollow
      if (isFollow.length > 0) {
        await this.followRepository.query(`delete from following where following_id=${idYgMauDIFollow} and follower_id=${idUser}`);
        return res.status(200).json({ message: "Unfollowed successfully" });
      }
      //if not following then follow
      if (isFollow.length === 0) {
        await this.followRepository.query(`insert into following (following_id, follower_id) values (${idYgMauDIFollow}, ${idUser})`);
        return res.status(200).json({ message: "Followed successfully" });
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
})();
