import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  getFeedById(@Param('id') id: string): Feed {
    return this.feedsService.getFeedById(id);
  }

  @Post()
  createFeed(@Body() createFeedDto: CreateFeedDto): Feed {
    return this.feedsService.createFeed(createFeedDto);
  }
}
