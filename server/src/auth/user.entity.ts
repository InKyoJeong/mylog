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

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

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
}
