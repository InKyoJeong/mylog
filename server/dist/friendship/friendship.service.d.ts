import { Repository } from 'typeorm';
import { Friendship } from './friendship.entity';
import { User } from 'src/auth/user.entity';
export declare class FriendshipService {
    private friendshipRepository;
    private userRepository;
    constructor(friendshipRepository: Repository<Friendship>, userRepository: Repository<User>);
    getFriendsByStatus(user: User, status: Friendship['status']): Promise<User[]>;
    private findFriendshipByStatus;
    private checkExistingFriendship;
    sendFriendRequest(user: User, receiverId: number): Promise<void>;
    acceptFriendRequest(user: User, requesterId: number): Promise<void>;
    deleteFriendRequest(user: User, requesterId: number): Promise<number>;
    deleteFriend(user: User, friendId: number): Promise<number>;
    blockFriend(user: User, friendId: number): Promise<void>;
    unblockFriend(user: User, friendId: number): Promise<void>;
}
