import { Entity, PrimaryGeneratedColumn, JoinColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Thread } from "./threadEntity";
import { User } from "./userEntity";

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Thread, (thread) => thread.like, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  thread: Thread[];

  @ManyToOne(() => User, (user) => user.like, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
