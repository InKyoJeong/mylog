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
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
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

  @Get('/my')
  getAllMyFeed(@GetUser() user: User): Promise<Feed[]> {
    return this.feedService.getAllMyFeed(user);
  }

  @Get('/:id')
  getFeedById(@Param('id') id: number, @GetUser() user: User): Promise<Feed> {
    return this.feedService.getFeedById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createFeed(
    @Body() createFeedDto: CreateFeedDto,
    @GetUser() user: User,
  ): Promise<Feed> {
    return this.feedService.createFeed(createFeedDto, user);
  }

  @Delete('/:id')
  deleteFeed(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.feedService.deleteFeed(id, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateFeed(
    @Param('id', ParseIntPipe) id: number,
    @Body() createFeedDto: CreateFeedDto,
    @GetUser() user: User,
  ) {
    return this.feedService.updateFeed(id, createFeedDto, user);
  }
}
