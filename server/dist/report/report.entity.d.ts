import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/user.entity';
export declare class Report extends BaseEntity {
    id: number;
    postId: number;
    title: string;
    createdAt: Date;
    user: User;
}
