import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from './feed.controller';
import { Feed } from './feed.entity';
import { FeedService } from './feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedsModule {}
