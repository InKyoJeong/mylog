import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/user.entity';
export declare class Feedback extends BaseEntity {
    id: number;
    email: string;
    title: string;
    description: string;
    createdAt: Date;
    user: User;
}
