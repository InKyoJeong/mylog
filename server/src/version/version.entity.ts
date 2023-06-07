import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Version extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '1.0.0' })
  versionIOS: string;

  @Column({ default: '1.0.0' })
  versionAndroid: string;
}
