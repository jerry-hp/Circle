import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./userEntity";
import { Thread } from "./threadEntity";

@Entity()
export class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.replies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Thread, (thread) => thread.replies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  thread: Thread;
}
