import { IsNotEmpty } from 'class-validator';
import { Friendship } from '../friendship.entity';

export class UpdateFriendRequestDto {
  @IsNotEmpty()
  status: Friendship['status'];
}
