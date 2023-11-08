import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Thread } from "./threadEntity";
import { Replies } from "./replyEntity";
import { Likes } from "./likeEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  profile_description: string;

  @OneToMany(() => Thread, (thread) => thread.user, {
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  threads: Thread[];

  @OneToMany(() => Likes, (likes) => likes.user, {
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  like: Likes[];

  @OneToMany(() => Replies, (replies) => replies.user, {
    nullable: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  replies: Replies[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}
