import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./userEntity";

@Entity({ name: "follows" })
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  following_id: User;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  follower_id: User;
}
