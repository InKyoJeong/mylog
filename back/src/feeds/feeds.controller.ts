import { Body, Controller, Get, Post } from '@nestjs/common';
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
  createFeed(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Feed {
    return this.feedsService.createFeed(title, description);
  }
}
