import { FriendshipService } from './friendship.service';
import { User } from 'src/auth/user.entity';
export declare class FriendshipController {
    private friendshipService;
    constructor(friendshipService: FriendshipService);
    getMyFriends(user: User): Promise<User[]>;
    getPendingFriends(user: User): Promise<User[]>;
    getBlockedFriends(user: User): Promise<User[]>;
    sendFriendRequest(receiverId: number, user: User): Promise<void>;
    acceptFriendRequest(requesterId: number, user: User): Promise<number>;
    deleteFriendRequest(requesterId: number, user: User): Promise<number>;
    deleteFriend(friendId: number, user: User): Promise<number>;
    blockFriend(friendId: number, user: User): Promise<number>;
    unblockFriend(friendId: number, user: User): Promise<number>;
}
