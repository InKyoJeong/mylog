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
  async sendFriendRequest(
    @Param('receiverId') receiverId: number,
    @GetUser() user: User,
  ) {
    await this.friendshipService.sendFriendRequest(user, receiverId);
  }

  @Patch('friend-requests/:requesterId')
  async updateFriendRequest(
    @Param('requesterId') requesterId: number,
    @GetUser() user: User,
    @Body() updateFriendRequestDto: UpdateFriendRequestDto,
  ) {
    await this.friendshipService.updateFriendRequest(
      user,
      requesterId,
      updateFriendRequestDto,
    );
  }

  @Get('/friend-requests')
  async getFriendRequests(@GetUser() user: User) {
    await this.friendshipService.getFriendRequests(user);
  }

  @Get('/friends')
  async getFriends(@GetUser() user: User) {
    return this.friendshipService.getFriends(user);
  }
}
