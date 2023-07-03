import { Friendship } from './friendship.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
export declare class FriendshipService {
    private friendshipRepository;
    private userRepository;
    constructor(friendshipRepository: Repository<Friendship>, userRepository: Repository<User>);
    getFriendsByStatus(user: User, status: Friendship['status']): Promise<Friendship[]>;
    private findFriendshipByStatus;
    private checkExistingFriendship;
    sendFriendRequest(user: User, receiverId: number): Promise<void>;
    updateFriendRequest(user: User, requesterId: number, updateFriendRequestDto: UpdateFriendRequestDto): Promise<void>;
    deleteFriendRequest(user: User, requesterId: number): Promise<number>;
    deleteFriend(user: User, friendId: number): Promise<number>;
    blockFriend(user: User, friendId: number): Promise<void>;
    unblockFriend(user: User, friendId: number): Promise<void>;
}
