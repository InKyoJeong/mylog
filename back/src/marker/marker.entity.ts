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
import { MarkerColor } from './marker-color.enum';

@Entity()
export class Marker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  latitude: number;

  @Column({ type: 'decimal' })
  longitude: number;

  @Column()
  color: MarkerColor;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.marker, { eager: false })
  user: User;
}
