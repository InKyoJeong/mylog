import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  imageUri?: string;

  @Column({ nullable: true })
  [MarkerColor.RED]: string;

  @Column({ nullable: true })
  [MarkerColor.YELLOW]: string;

  @Column({ nullable: true })
  [MarkerColor.BLUE]: string;

  @Column({ nullable: true })
  [MarkerColor.GREEN]: string;

  @Column({ nullable: true })
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
}
