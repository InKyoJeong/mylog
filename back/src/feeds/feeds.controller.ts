import { Controller, Get } from '@nestjs/common';
import { Feed } from './feed.model';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
  constructor(private feedsService: FeedsService) {}

  @Get('/')
  getAllFeeds(): Feed[] {
    return this.feedsService.getAllFeeds();
  }
}
