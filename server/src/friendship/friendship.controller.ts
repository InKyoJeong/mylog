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

@Controller('friends')
@UseGuards(AuthGuard())
export class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  @Post('/requests/:receiverId')
  sendFriendRequest(
    @Param('receiverId') receiverId: number,
    @GetUser() user: User,
  ) {
    return this.friendshipService.sendFriendRequest(user, receiverId);
  }

  @Patch('/requests/:requesterId')
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

  @Get('/')
  getMyFriends(@GetUser() user: User) {
    return this.friendshipService.getFriendsByStatus(user, 'accepted');
  }

  @Get('/requests')
  getPendingFriends(@GetUser() user: User) {
    return this.friendshipService.getFriendsByStatus(user, 'pending');
  }
}
