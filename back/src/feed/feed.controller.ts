import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './feed.entity';
import { FeedService } from './feed.service';

@Controller('feed')
@UseGuards(AuthGuard())
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Get()
  getAllFeed(): Promise<Feed[]> {
    return this.feedService.getAllFeed();
  }

  @Get('/:id')
  getFeedById(@Param('id') id: number): Promise<Feed> {
    return this.feedService.getFeedById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createFeed(@Body() createFeedDto: CreateFeedDto): Promise<Feed> {
    return this.feedService.createFeed(createFeedDto);
  }

  @Delete('/:id')
  deleteFeed(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.feedService.deleteFeed(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateFeed(
    @Param('id', ParseIntPipe) id: number,
    @Body() createFeedDto: CreateFeedDto,
  ) {
    return this.feedService.updateFeed(id, createFeedDto);
  }
}
