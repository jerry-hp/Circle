import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Thread } from "./threadEntity";
import { Replies } from "./replyEntity";
import { Likes } from "./likeEntity";
import Follow from "./followEntity";

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

  @OneToMany(() => Follow, (follow) => follow.follower_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  follower: User[];

  @OneToMany(() => Follow, (follow) => follow.following_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  following: User[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
