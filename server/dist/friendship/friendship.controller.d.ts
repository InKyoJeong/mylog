import { FriendshipService } from './friendship.service';
import { User } from 'src/auth/user.entity';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
export declare class FriendshipController {
    private friendshipService;
    constructor(friendshipService: FriendshipService);
    getMyFriends(user: User): Promise<import("./friendship.entity").Friendship[]>;
    getPendingFriends(user: User): Promise<import("./friendship.entity").Friendship[]>;
    getBlockedFriends(user: User): Promise<import("./friendship.entity").Friendship[]>;
    sendFriendRequest(receiverId: number, user: User): Promise<void>;
    updateFriendRequest(requesterId: number, user: User, updateFriendRequestDto: UpdateFriendRequestDto): Promise<void>;
    deleteFriendRequest(requesterId: number, user: User): Promise<number>;
    deleteFriend(friendId: number, user: User): Promise<number>;
    blockFriend(friendId: number, user: User): Promise<void>;
    unblockFriend(friendId: number, user: User): Promise<void>;
}
