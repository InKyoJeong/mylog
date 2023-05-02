import { Marker } from 'src/marker/marker.entity';
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

  @ManyToOne(() => Marker, (marker) => marker.images)
  marker: Marker;
}
