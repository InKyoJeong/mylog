import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/user.entity';
export declare class Memo extends BaseEntity {
    id: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: User;
}
