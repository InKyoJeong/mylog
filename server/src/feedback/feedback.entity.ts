import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.feedback, {
    eager: false,
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: User;
}
