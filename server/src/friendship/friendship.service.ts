import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Friendship } from './friendship.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendFriendRequest(user: User, receiverId: number): Promise<void> {
    const receiver = await this.userRepository.findOneBy({ id: receiverId });

    if (!user || !receiver) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const existingRequest = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .where('friendship.requesterId = :requesterId', { requesterId: user.id })
      .andWhere('friendship.status = :status', { status: 'pending' })
      .getOne();

    if (existingRequest) {
      throw new ConflictException('이미 요청을 보낸 상태입니다.');
    }

    const friendship = new Friendship();
    friendship.requester = user;
    friendship.receiver = receiver;
    friendship.status = 'pending';

    try {
      await this.friendshipRepository.save(friendship);
    } catch (error) {
      throw new InternalServerErrorException(
        '친구 요청을 보내는 도중 에러가 발생했습니다.',
      );
    }
  }

  async updateFriendRequest(
    user: User,
    requesterId: number,
    updateFriendRequestDto: UpdateFriendRequestDto,
  ): Promise<void> {
    const { status } = updateFriendRequestDto;

    const friendship = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .where('friendship.requesterId = :requesterId', { requesterId })
      .andWhere('friendship.receiverId = :receiverId', { receiverId: user.id })
      .andWhere('friendship.status = :status', { status: 'pending' })
      .getOne();

    if (!friendship) {
      throw new NotFoundException('존재하지 않는 요청입니다.');
    }

    friendship.status = status;
    await this.friendshipRepository.save(friendship);
  }

  private getFriendProfile(friendShips: Friendship[]) {
    return friendShips.map((friend) => ({
      ...friend,
      requester: {
        id: friend.requester.id,
        nickname: friend.requester.nickname,
        email: friend.requester.email,
        imageUri: friend.requester.imageUri,
        kakaoImageUri: friend.requester.kakaoImageUri,
      },
    }));
  }

  async getFriendRequests(user: User) {
    const friendRequests = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.requester', 'requester')
      .where('friendship.receiverId = :userId', { userId: user.id })
      .andWhere('friendship.status = :status', { status: 'pending' })
      .getMany();

    return this.getFriendProfile(friendRequests);
  }

  async getFriends(user: User) {
    const friendships = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.requester', 'requester')
      .where('friendship.receiverId = :userId', { userId: user.id })
      .andWhere('friendship.status = :status', { status: 'accepted' })
      .getMany();

    return this.getFriendProfile(friendships);
  }
}
