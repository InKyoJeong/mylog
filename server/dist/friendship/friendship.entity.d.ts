import { User } from 'src/auth/user.entity';
import { BaseEntity } from 'typeorm';
export declare class Friendship extends BaseEntity {
    id: number;
    status: 'pending' | 'accepted' | 'blocked';
    createdAt: Date;
    updatedAt: Date;
    requester: User;
    receiver: User;
}
