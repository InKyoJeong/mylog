import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FeedTag } from './feed-tag.enum';

@Entity()
export class Feed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tag: FeedTag;
}
