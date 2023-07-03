import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/user.entity';
export declare class Friendship extends BaseEntity {
    id: number;
    status: 'pending' | 'accepted' | 'blocked';
    createdAt: Date;
    updatedAt: Date;
    requester: User;
    receiver: User;
}
