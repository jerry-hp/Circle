import { Replies } from "../entities/replyEntity";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { v2 as cloudinary } from "cloudinary";

export default new (class ReplyService {
  private readonly replyRepository: Repository<Replies> = AppDataSource.getRepository(Replies);

  async find(req: Request, res: Response): Promise<Response> {
    const reply = await this.replyRepository.find({ relations: ["user", "thread"], order: { id: "DESC" } });
    return res.status(200).json({ reply });
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const reply = req.body;
      const user = reply.user;
      const image = res.locals.filename;

      let imagesrc;
      const data = {
        content: req.body.content,
        image: image,
      };
      cloudinary.config({
        cloud_name: "dwuwsanew",
        api_key: "321989199898163",
        api_secret: "-NYynVZ1TiykXgnGCvr2GRyhGtM",
      });

      if (image) {
        const cloudinaryResponse = await cloudinary.uploader.upload("src/uploads/" + image, { folder: "circle-app" });
        imagesrc = cloudinaryResponse.secure_url;
      }

      console.log({ imagesrc });

      const newReply = this.replyRepository.create({
        content: data.content,
        image: imagesrc,
        user: user,
        thread: req.body.thread,
      });

      await this.replyRepository.save(newReply);
      return res.status(200).json({ newReply });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.replyRepository.delete({ id: Number(id) });
      return res.status(204).send({ message: `reply ${id} deleted` });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

})();
