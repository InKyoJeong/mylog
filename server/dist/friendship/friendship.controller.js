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
exports.FriendshipController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const friendship_service_1 = require("./friendship.service");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const update_friend_request_dto_1 = require("./dto/update-friend-request.dto");
let FriendshipController = class FriendshipController {
    constructor(friendshipService) {
        this.friendshipService = friendshipService;
    }
    getMyFriends(user) {
        return this.friendshipService.getFriendsByStatus(user, 'accepted');
    }
    getPendingFriends(user) {
        return this.friendshipService.getFriendsByStatus(user, 'pending');
    }
    getBlockedFriends(user) {
        return this.friendshipService.getFriendsByStatus(user, 'blocked');
    }
    sendFriendRequest(receiverId, user) {
        return this.friendshipService.sendFriendRequest(user, receiverId);
    }
    updateFriendRequest(requesterId, user, updateFriendRequestDto) {
        return this.friendshipService.updateFriendRequest(user, requesterId, updateFriendRequestDto);
    }
    deleteFriendRequest(requesterId, user) {
        return this.friendshipService.deleteFriendRequest(user, requesterId);
    }
    deleteFriend(friendId, user) {
        return this.friendshipService.deleteFriend(user, friendId);
    }
    blockFriend(friendId, user) {
        return this.friendshipService.blockFriend(user, friendId);
    }
    unblockFriend(friendId, user) {
        return this.friendshipService.unblockFriend(user, friendId);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "getMyFriends", null);
__decorate([
    (0, common_1.Get)('/requests'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "getPendingFriends", null);
__decorate([
    (0, common_1.Get)('/block'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "getBlockedFriends", null);
__decorate([
    (0, common_1.Post)('/requests/:receiverId'),
    __param(0, (0, common_1.Param)('receiverId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Patch)('/requests/:requesterId'),
    __param(0, (0, common_1.Param)('requesterId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        update_friend_request_dto_1.UpdateFriendRequestDto]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "updateFriendRequest", null);
__decorate([
    (0, common_1.Delete)('/requests/:requesterId'),
    __param(0, (0, common_1.Param)('requesterId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "deleteFriendRequest", null);
__decorate([
    (0, common_1.Delete)('/:friendId'),
    __param(0, (0, common_1.Param)('friendId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "deleteFriend", null);
__decorate([
    (0, common_1.Patch)('/block/:friendId'),
    __param(0, (0, common_1.Param)('friendId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "blockFriend", null);
__decorate([
    (0, common_1.Delete)('/unblock/:friendId'),
    __param(0, (0, common_1.Param)('friendId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FriendshipController.prototype, "unblockFriend", null);
FriendshipController = __decorate([
    (0, common_1.Controller)('friends'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [friendship_service_1.FriendshipService])
], FriendshipController);
exports.FriendshipController = FriendshipController;
//# sourceMappingURL=friendship.controller.js.map