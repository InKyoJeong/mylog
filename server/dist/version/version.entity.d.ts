import { BaseEntity } from 'typeorm';
export declare class Version extends BaseEntity {
    id: number;
    ios: string;
    android: string;
}
