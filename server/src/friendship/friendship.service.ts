import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Friendship } from './friendship.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getFriendsByStatus(user: User, status: Friendship['status']) {
    const friends = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.requester', 'requester')
      .select([
        'friendship',
        'requester.id',
        'requester.nickname',
        'requester.email',
        'requester.imageUri',
        'requester.kakaoImageUri',
      ])
      .where('friendship.receiverId = :userId', { userId: user.id })
      .andWhere('friendship.status = :status', { status })
      .orderBy('friendship.updatedAt', 'DESC')
      .getMany();

    return friends.map((friend) => friend.requester);
  }

  private async findFriendshipByStatus(
    requesterId: number,
    receiverId: number,
    status: Friendship['status'],
  ) {
    return this.friendshipRepository
      .createQueryBuilder('friendship')
      .where('friendship.requesterId = :requesterId', { requesterId })
      .andWhere('friendship.receiverId = :receiverId', { receiverId })
      .andWhere('friendship.status = :status', { status })
      .getOne();
  }

  private async checkExistingFriendship(
    user: User,
    receiverId: number,
    status: Friendship['status'],
    errorMessage: string,
  ): Promise<void> {
    const friendship = await this.findFriendshipByStatus(
      user.id,
      receiverId,
      status,
    );

    if (friendship) {
      throw new ConflictException(errorMessage);
    }
  }

  async sendFriendRequest(user: User, receiverId: number): Promise<void> {
    const receiver = await this.userRepository.findOneBy({ id: receiverId });

    if (user.id === receiverId) {
      throw new ConflictException('자신은 추가할 수 없습니다.');
    }

    if (!user || !receiver) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    await this.checkExistingFriendship(
      user,
      receiverId,
      'pending',
      '이미 요청을 보낸 상태입니다.',
    );

    await this.checkExistingFriendship(
      user,
      receiverId,
      'accepted',
      '이미 친구 추가된 사용자입니다.',
    );

    await this.checkExistingFriendship(
      user,
      receiverId,
      'blocked',
      '요청을 보낼 수 없는 사용자입니다.',
    );

    const friendship = new Friendship();
    friendship.requester = user;
    friendship.receiver = receiver;
    friendship.status = 'pending';

    try {
      await this.friendshipRepository.save(friendship);
    } catch (error) {
      throw new InternalServerErrorException(
        '요청을 보내는 도중 에러가 발생했습니다.',
      );
    }
  }

  async acceptFriendRequest(user: User, requesterId: number) {
    const receiver = await this.userRepository.findOneBy({ id: requesterId });
    const friendship = await this.findFriendshipByStatus(
      requesterId,
      user.id,
      'pending',
    );

    if (!friendship || !receiver) {
      throw new NotFoundException(
        '이미 처리되었거나 존재하지 않는 사용자입니다.',
      );
    }

    friendship.status = 'accepted';
    await this.friendshipRepository.save(friendship);

    const existingReverseFriendShip = await this.findFriendshipByStatus(
      user.id,
      requesterId,
      'pending',
    );

    if (existingReverseFriendShip) {
      existingReverseFriendShip.status = 'accepted';
      await this.friendshipRepository.save(existingReverseFriendShip);

      return requesterId;
    }

    const reverseFriendship = new Friendship();
    reverseFriendship.requester = user;
    reverseFriendship.receiver = receiver;
    reverseFriendship.status = 'accepted';

    await this.friendshipRepository.save(reverseFriendship);

    return requesterId;
  }

  async deleteFriendRequest(user: User, requesterId: number) {
    const friendship = await this.findFriendshipByStatus(
      requesterId,
      user.id,
      'pending',
    );

    if (!friendship) {
      throw new NotFoundException('존재하지 않는 요청입니다.');
    }

    try {
      await this.friendshipRepository.delete(friendship.id);

      return requesterId;
    } catch (error) {
      throw new InternalServerErrorException(
        '요청을 삭제하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async deleteFriend(user: User, friendId: number) {
    const friendship = await this.findFriendshipByStatus(
      user.id,
      friendId,
      'accepted',
    );

    if (!friendship) {
      throw new NotFoundException('친구가 아닌 사용자입니다.');
    }

    try {
      await this.friendshipRepository.delete(friendship.id);

      const reverseFriendship = await this.findFriendshipByStatus(
        friendId,
        user.id,
        'accepted',
      );
      if (reverseFriendship) {
        await this.friendshipRepository.delete(reverseFriendship.id);
      }

      return friendId;
    } catch (error) {
      throw new InternalServerErrorException('삭제 도중 에러가 발생했습니다.');
    }
  }

  async blockFriend(user: User, friendId: number) {
    const friendship = await this.findFriendshipByStatus(
      user.id,
      friendId,
      'accepted',
    );

    if (!friendship) {
      throw new NotFoundException('친구가 아닌 사용자입니다.');
    }

    try {
      friendship.status = 'blocked';
      await this.friendshipRepository.save(friendship);

      const reverseFriendship = await this.findFriendshipByStatus(
        friendId,
        user.id,
        'accepted',
      );

      if (reverseFriendship) {
        reverseFriendship.status = 'blocked';
        await this.friendshipRepository.save(reverseFriendship);
      }

      return friendId;
    } catch (error) {
      throw new InternalServerErrorException('차단 도중 에러가 발생했습니다.');
    }
  }

  async unblockFriend(user: User, friendId: number) {
    const friendship = await this.findFriendshipByStatus(
      user.id,
      friendId,
      'blocked',
    );

    if (!friendship) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    try {
      await this.friendshipRepository.delete(friendship.id);

      const reverseFriendship = await this.findFriendshipByStatus(
        friendId,
        user.id,
        'blocked',
      );

      if (reverseFriendship) {
        await this.friendshipRepository.delete(reverseFriendship.id);
      }

      return friendId;
    } catch (error) {
      throw new InternalServerErrorException(
        '차단 해제 도중 에러가 발생했습니다.',
      );
    }
  }
}
