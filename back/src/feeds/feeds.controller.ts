import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed, FeedTag } from './feed.model';
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

  @Delete('/:id')
  deleteFeed(@Param('id') id: string): void {
    this.feedsService.deleteFeed(id);
  }

  @Patch('/:id')
  updateFeed(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('tag') tag: FeedTag,
  ) {
    return this.feedsService.updateFeed(id, title, description, tag);
  }
}
