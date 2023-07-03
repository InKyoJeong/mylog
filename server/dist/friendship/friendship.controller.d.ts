import { FriendshipService } from './friendship.service';
import { User } from 'src/auth/user.entity';
export declare class FriendshipController {
    private friendshipService;
    constructor(friendshipService: FriendshipService);
    getMyFriends(user: User): Promise<import("./friendship.entity").Friendship[]>;
    getPendingFriends(user: User): Promise<import("./friendship.entity").Friendship[]>;
    getBlockedFriends(user: User): Promise<import("./friendship.entity").Friendship[]>;
    sendFriendRequest(receiverId: number, user: User): Promise<void>;
    acceptFriendRequest(requesterId: number, user: User): Promise<void>;
    deleteFriendRequest(requesterId: number, user: User): Promise<number>;
    deleteFriend(friendId: number, user: User): Promise<number>;
    blockFriend(friendId: number, user: User): Promise<void>;
    unblockFriend(friendId: number, user: User): Promise<void>;
}
