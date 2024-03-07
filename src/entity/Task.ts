// entities/Task.js
import { Entity , PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import {User} from "./user.entity";

@Entity({name : "tasks"})
export class Task {
  @PrimaryGeneratedColumn()
  id : string;

  @Column()
  title : string;

  @Column()
  description : string;

  @Column()
  due_date : string;

  @Column()
  status : string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  deleted_at: Date;


  // @ManyToOne(() => User, user => user.tasks)
  // user;
}
