import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { MarkerType } from './marker-type.enum';

@Entity()
export class Marker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  markerType: MarkerType;

  @ManyToOne(() => User, (user) => user.marker, { eager: false })
  user: User;
}
