import { Thread } from "../entities/threadEntity";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { threadSchema } from "../utils/joi";
import { v2 as cloudinary } from "cloudinary";

export default new (class ThreadService {
  private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const threads = await this.threadRepository.find({ relations: ["user", "like", "replies"], order: { id: "DESC" } });

      return res.status(200).json({ threads });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const thread = req.body;

      const user = thread.user;
      const image = res.locals.filename;

      let imagesrc;
      const data = {
        content: req.body.content,
        image: image,
      };

      //connecting to cloudinary
      cloudinary.config({
        cloud_name: "dwuwsanew",
        api_key: "321989199898163",
        api_secret: "-NYynVZ1TiykXgnGCvr2GRyhGtM",
      });

      // uploading image to cloudinary
      if (image) {
        const cloudinaryResponse = await cloudinary.uploader.upload("src/uploads/" + image, { folder: "circle-app" });
        imagesrc = cloudinaryResponse.secure_url;
      }
      console.log({ imagesrc });
      const newThreads = this.threadRepository.create({
        content: data.content,
        image: imagesrc,
        user: user,
      });

      const createdThread = await this.threadRepository.save(newThreads);

      return res.status(201).json(createdThread);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.threadRepository.delete({ id: Number(id) });

      return res.status(204).send({ message: `thread ${id} deleted` });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
})();
