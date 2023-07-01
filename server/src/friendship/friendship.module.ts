import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { Friendship } from './friendship.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friendship, User]), AuthModule],
  controllers: [FriendshipController],
  providers: [FriendshipService],
})
export class FriendshipModule {}
