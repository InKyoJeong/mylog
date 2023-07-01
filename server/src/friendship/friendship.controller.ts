import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendshipService } from './friendship.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller()
@UseGuards(AuthGuard())
export class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  @Post('/friend-request/:receiverId')
  async sendFriendRequest(
    @Param('receiverId') receiverId: number,
    @GetUser() user: User,
  ) {
    await this.friendshipService.sendFriendRequest(user, receiverId);
  }
}
