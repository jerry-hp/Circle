import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./userEntity";
import { Replies } from "./replyEntity";
import { Likes } from "./likeEntity";

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: "string";

  @Column({ nullable: true })
  image: "string";

  @ManyToOne(() => User, (user) => user.threads, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  user: User;

  @OneToMany(() => Likes, (likes) => likes.thread, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  like: Likes[];

  @OneToMany(() => Replies, (replies) => replies.thread)
  
  replies: Replies[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
