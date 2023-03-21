import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FeedController } from './feed.controller';
import { Feed } from './feed.entity';
import { FeedService } from './feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feed]), AuthModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedsModule {}
