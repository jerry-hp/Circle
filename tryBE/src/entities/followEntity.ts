import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./userEntity";

@Entity()
export default class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  following_id: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  follower_id: User;
}
