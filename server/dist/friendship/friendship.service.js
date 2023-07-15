"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const friendship_entity_1 = require("./friendship.entity");
const user_entity_1 = require("../auth/user.entity");
let FriendshipService = class FriendshipService {
    constructor(friendshipRepository, userRepository) {
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }
    async getFriendsByStatus(user, status) {
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
    async findFriendshipByStatus(requesterId, receiverId, status) {
        return this.friendshipRepository
            .createQueryBuilder('friendship')
            .where('friendship.requesterId = :requesterId', { requesterId })
            .andWhere('friendship.receiverId = :receiverId', { receiverId })
            .andWhere('friendship.status = :status', { status })
            .getOne();
    }
    async checkExistingFriendship(user, receiverId, status, errorMessage) {
        const friendship = await this.findFriendshipByStatus(user.id, receiverId, status);
        if (friendship) {
            throw new common_1.ConflictException(errorMessage);
        }
    }
    async sendFriendRequest(user, receiverId) {
        const receiver = await this.userRepository.findOneBy({ id: receiverId });
        if (user.id === receiverId) {
            throw new common_1.ConflictException('자신은 추가할 수 없습니다.');
        }
        if (!user || !receiver) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        await this.checkExistingFriendship(user, receiverId, 'pending', '이미 요청을 보낸 상태입니다.');
        await this.checkExistingFriendship(user, receiverId, 'accepted', '이미 친구 추가된 사용자입니다.');
        await this.checkExistingFriendship(user, receiverId, 'blocked', '요청을 보낼 수 없는 사용자입니다.');
        const friendship = new friendship_entity_1.Friendship();
        friendship.requester = user;
        friendship.receiver = receiver;
        friendship.status = 'pending';
        try {
            await this.friendshipRepository.save(friendship);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('요청을 보내는 도중 에러가 발생했습니다.');
        }
    }
    async acceptFriendRequest(user, requesterId) {
        const receiver = await this.userRepository.findOneBy({ id: requesterId });
        const friendship = await this.findFriendshipByStatus(requesterId, user.id, 'pending');
        if (!friendship || !receiver) {
            throw new common_1.NotFoundException('이미 처리되었거나 존재하지 않는 사용자입니다.');
        }
        friendship.status = 'accepted';
        await this.friendshipRepository.save(friendship);
        const existingReverseFriendShip = await this.findFriendshipByStatus(user.id, requesterId, 'pending');
        if (existingReverseFriendShip) {
            existingReverseFriendShip.status = 'accepted';
            await this.friendshipRepository.save(existingReverseFriendShip);
            return;
        }
        const reverseFriendship = new friendship_entity_1.Friendship();
        reverseFriendship.requester = user;
        reverseFriendship.receiver = receiver;
        reverseFriendship.status = 'accepted';
        await this.friendshipRepository.save(reverseFriendship);
        return requesterId;
    }
    async deleteFriendRequest(user, requesterId) {
        const friendship = await this.findFriendshipByStatus(requesterId, user.id, 'pending');
        if (!friendship) {
            throw new common_1.NotFoundException('존재하지 않는 요청입니다.');
        }
        try {
            await this.friendshipRepository.delete(friendship.id);
            return requesterId;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('요청을 삭제하는 도중 에러가 발생했습니다.');
        }
    }
    async deleteFriend(user, friendId) {
        const friendship = await this.findFriendshipByStatus(user.id, friendId, 'accepted');
        if (!friendship) {
            throw new common_1.NotFoundException('친구가 아닌 사용자입니다.');
        }
        try {
            await this.friendshipRepository.delete(friendship.id);
            const reverseFriendship = await this.findFriendshipByStatus(friendId, user.id, 'accepted');
            if (reverseFriendship) {
                await this.friendshipRepository.delete(reverseFriendship.id);
            }
            return friendId;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('삭제 도중 에러가 발생했습니다.');
        }
    }
    async blockFriend(user, friendId) {
        const friendship = await this.findFriendshipByStatus(user.id, friendId, 'accepted');
        if (!friendship) {
            throw new common_1.NotFoundException('친구가 아닌 사용자입니다.');
        }
        try {
            friendship.status = 'blocked';
            await this.friendshipRepository.save(friendship);
            const reverseFriendship = await this.findFriendshipByStatus(friendId, user.id, 'accepted');
            if (reverseFriendship) {
                reverseFriendship.status = 'blocked';
                await this.friendshipRepository.save(reverseFriendship);
            }
            return friendId;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('차단 도중 에러가 발생했습니다.');
        }
    }
    async unblockFriend(user, friendId) {
        const friendship = await this.findFriendshipByStatus(user.id, friendId, 'blocked');
        if (!friendship) {
            throw new common_1.NotFoundException('존재하지 않는 사용자입니다.');
        }
        try {
            await this.friendshipRepository.delete(friendship.id);
            const reverseFriendship = await this.findFriendshipByStatus(friendId, user.id, 'blocked');
            if (reverseFriendship) {
                await this.friendshipRepository.delete(reverseFriendship.id);
            }
            return friendId;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('차단 해제 도중 에러가 발생했습니다.');
        }
    }
};
FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(friendship_entity_1.Friendship)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], FriendshipService);
exports.FriendshipService = FriendshipService;
//# sourceMappingURL=friendship.service.js.map