import { Post } from 'src/post/post.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uri: string;

  @ManyToOne(() => Post, (post) => post.images)
  post: Post;
}
