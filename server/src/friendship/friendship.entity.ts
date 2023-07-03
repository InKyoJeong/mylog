import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/auth/user.entity';

@Entity()
export class Friendship extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: 'pending' | 'accepted' | 'blocked';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.requestedFriendships, {
    onDelete: 'CASCADE',
  })
  requester: User;

  @ManyToOne(() => User, (user) => user.receivedFriendships, {
    onDelete: 'CASCADE',
  })
  receiver: User;
}
