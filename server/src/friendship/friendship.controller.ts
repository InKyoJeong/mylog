import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendshipService } from './friendship.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('friends')
@UseGuards(AuthGuard())
export class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  @Get('/')
  getMyFriends(@GetUser() user: User) {
    return this.friendshipService.getFriendsByStatus(user, 'accepted');
  }

  @Get('/requests')
  getPendingFriends(@GetUser() user: User) {
    return this.friendshipService.getFriendsByStatus(user, 'pending');
  }

  @Get('/block')
  getBlockedFriends(@GetUser() user: User) {
    return this.friendshipService.getFriendsByStatus(user, 'blocked');
  }

  @Post('/requests/:receiverId')
  sendFriendRequest(
    @Param('receiverId', ParseIntPipe) receiverId: number,
    @GetUser() user: User,
  ) {
    return this.friendshipService.sendFriendRequest(user, receiverId);
  }

  @Patch('/requests/:requesterId')
  acceptFriendRequest(
    @Param('requesterId', ParseIntPipe) requesterId: number,
    @GetUser() user: User,
  ) {
    return this.friendshipService.acceptFriendRequest(user, requesterId);
  }

  @Delete('/requests/:requesterId')
  deleteFriendRequest(
    @Param('requesterId', ParseIntPipe) requesterId: number,
    @GetUser() user: User,
  ) {
    return this.friendshipService.deleteFriendRequest(user, requesterId);
  }

  @Delete('/:friendId')
  deleteFriend(
    @Param('friendId', ParseIntPipe) friendId: number,
    @GetUser() user: User,
  ) {
    return this.friendshipService.deleteFriend(user, friendId);
  }

  @Patch('/block/:friendId')
  blockFriend(
    @Param('friendId', ParseIntPipe) friendId: number,
    @GetUser() user: User,
  ) {
    return this.friendshipService.blockFriend(user, friendId);
  }

  @Delete('/unblock/:friendId')
  unblockFriend(
    @Param('friendId', ParseIntPipe) friendId: number,
    @GetUser() user: User,
  ) {
    return this.friendshipService.unblockFriend(user, friendId);
  }
}
