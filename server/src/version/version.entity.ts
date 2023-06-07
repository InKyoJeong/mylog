import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Version extends BaseEntity {
  @Column({ default: '1.0.0' })
  versionIOS: string;

  @Column({ default: '1.0.0' })
  versionAndroid: string;
}
