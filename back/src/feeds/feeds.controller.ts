import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './feed.model';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private feedsService: FeedsService) {}

  @Get()
  getAllFeeds(): Feed[] {
    return this.feedsService.getAllFeeds();
  }

  @Post()
  createFeed(@Body() createFeedDto: CreateFeedDto): Feed {
    return this.feedsService.createFeed(createFeedDto);
  }
}
