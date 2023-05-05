import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { Image } from 'src/image/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Image]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
