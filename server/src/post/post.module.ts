import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';
import { Image } from 'src/image/image.entity';
import { Friendship } from 'src/friendship/friendship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Image, Friendship]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
