import { BaseEntity } from 'typeorm';
export declare class Version extends BaseEntity {
    id: number;
    versionIOS: string;
    versionAndroid: string;
}
