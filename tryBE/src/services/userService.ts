import { Repository } from "typeorm";
import { User } from "../entities/userEntity";
import { AppDataSource } from "../data-source";
import { Response, Request } from "express";
import { userSchema } from "../utils/joi";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export default new (class UserService {
  private userRepository: Repository<User> = AppDataSource.getRepository(User);
  static find: any;

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userRepository.find();

      return res.status(200).json({ users });
    } catch (err) {
      console.log({ user: err });
    }
  }

  //for registration
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.body;

      const { error } = userSchema.validate(user);
      error && res.status(400).json({ joi: error });

      const dbUser = await this.userRepository.find({ where: { email: user.email } });
      if (dbUser.length > 0) {
        return res.status(400).json({ error: "email already exists" });
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      const newUser = await this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return res.status(200).json({ newUser });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  //for login
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.body;

      const checkUser = await this.userRepository.find({ where: { email: user.email } });
      if (checkUser.length === 0) {
        return res.status(400).json({ error: "email not found" });
      }

      const checkPassword = await bcrypt.compare(user.password, checkUser[0].password);
      if (!checkPassword) {
        return res.status(400).json({ error: "invalid password" });
      }

      const token = jwt.sign({ id: checkUser[0].id }, "ikoSecretKeyMah", { expiresIn: "3h" });

      return res.status(200).json({ token, user: checkUser[0] });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  //for check authtentication
  async check(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession;
      console.log({ loginSession });
      const user = await this.userRepository.findOne({
        where: {
          id: loginSession.idUser,
        },
      });

      return res.status(200).json({
        user,
        message: "You are logged in",
      });
    } catch (err) {
      return res.status(500).json({ Error: "Error while checking" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = req.body;

      const { error } = userSchema.validate(user);
      error && res.status(400).json({ joi: error });

      const dbUser = await this.userRepository.find({ where: { id: Number(id) } });

      if (user.full_name) dbUser[0].full_name = user.full_name;
      if (user.username) dbUser[0].username = user.username;
      if (user.email) dbUser[0].email = user.email;
      if (user.password) dbUser[0].password = user.password;
      if (user.profile_picture) dbUser[0].profile_picture = user.profile_picture;
      if (user.profile_description) dbUser[0].profile_description = user.profile_description;

      await this.userRepository.save(dbUser[0]);

      return res.status(200).json(dbUser[0]);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.userRepository.delete({ id: Number(id) });

      return res.status(204).json({ message: `user ${id} deleted` });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
})();
