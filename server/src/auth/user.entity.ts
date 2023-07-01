import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Favorite } from 'src/favorite/favorite.entity';
import { Post } from 'src/post/post.entity';
import { Feedback } from 'src/feedback/feedback.entity';
import { MarkerColor } from 'src/post/marker-color.enum';
import { Memo } from 'src/memo/memo.entity';
import { Friendship } from 'src/friendship/friendship.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginType: 'email' | 'kakao' | 'apple';

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  imageUri?: string;

  @Column({ nullable: true })
  kakaoImageUri?: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.RED]: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.YELLOW]: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.BLUE]: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.GREEN]: string;

  @Column({ nullable: true, default: '' })
  [MarkerColor.PURPLE]: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({ nullable: true })
  @Exclude()
  hashedRefreshToken?: string;

  @OneToMany(() => Post, (post) => post.user, { eager: false })
  post: Post[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorite: Favorite[];

  @OneToMany(() => Feedback, (feedback) => feedback.user, { eager: false })
  feedback: Feedback[];

  @OneToMany(() => Memo, (memo) => memo.user, { eager: false })
  memo: Memo[];

  @OneToMany(() => Friendship, (friendship) => friendship.requester)
  requestedFriendships: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.receiver)
  receivedFriendships: Friendship[];
}
