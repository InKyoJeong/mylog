import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Friendship extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: 'pending' | 'accepted' | 'rejected';

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.requestedFriendships, {
    onDelete: 'CASCADE',
  })
  requester: User;

  @ManyToOne(() => User, (user) => user.receivedFriendships, {
    onDelete: 'CASCADE',
  })
  receiver: User;
}
