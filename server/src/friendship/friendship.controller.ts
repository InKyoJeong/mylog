import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendshipService } from './friendship.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';

@Controller()
@UseGuards(AuthGuard())
export class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  @Post('/friend-requests/:receiverId')
  sendFriendRequest(
    @Param('receiverId') receiverId: number,
    @GetUser() user: User,
  ) {
    return this.friendshipService.sendFriendRequest(user, receiverId);
  }

  @Patch('friend-requests/:requesterId')
  updateFriendRequest(
    @Param('requesterId') requesterId: number,
    @GetUser() user: User,
    @Body() updateFriendRequestDto: UpdateFriendRequestDto,
  ) {
    return this.friendshipService.updateFriendRequest(
      user,
      requesterId,
      updateFriendRequestDto,
    );
  }

  @Get('/friend-requests')
  getFriendRequests(@GetUser() user: User) {
    return this.friendshipService.getFriendRequests(user);
  }

  @Get('/friends')
  getFriends(@GetUser() user: User) {
    return this.friendshipService.getFriends(user);
  }
}
