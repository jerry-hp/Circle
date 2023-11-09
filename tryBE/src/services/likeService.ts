import { Request, Response } from "express";
import { Likes } from "../entities/likeEntity";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export default new (class LikeService {
  private readonly likeRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const likes = await this.likeRepository.find({
        relations: ["thread", "user"],
        order: { id: "DESC" },
        // select: {
        //   id: true,
        //   thread: {
        //     id: true,
        //     content: true,
        //     image: true,
        //   },
        //   user: {
        //     id: true,
        //     username: true,
        //     full_name: true,
        //     profile_picture: true,
        //   },
        // },
      });
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

      console.log({ like });
      // Cari data "like" yang sesuai dengan thread dan pengguna
      const dbLike = await this.likeRepository.findOne({
        where: {
          user: {
            id: like.user,
          },
          thread: {
            id: like.thread,
          },
        },
      });

      console.log({ dbLike });
      // Jika sudah pernah "like", lakukan "unlike"
      if (dbLike !== null) {
        const result = await this.likeRepository.remove(dbLike);
        return res.json(result);
      } else {
        // Tambahkan "like" baru jika belum pernah "like"
        const newLike = this.likeRepository.create(like);
        const result = await this.likeRepository.save(newLike);
        return res.json(result);
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
})();
