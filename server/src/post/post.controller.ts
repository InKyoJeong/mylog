import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';
import { AuthAdminGuard } from 'src/auth/guard/admin-auth.guard';
import { ADMIN_FLAG } from 'src/constants';

@Controller()
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/markers/my')
  getAllMyMarkers(
    @GetUser() user: User,
  ): Promise<
    Pick<PostEntity, 'id' | 'latitude' | 'longitude' | 'color' | 'score'>[]
  > {
    return this.postService.getMyMarkers(user);
  }

  @Get('/posts/my')
  getMyPosts(@Query('page') page: number, @GetUser() user: User) {
    return this.postService.getMyPosts(page, user);
  }

  @Get('/posts/my/search')
  searchMyPostsByTitleAndAddress(
    @Query('query') query: string,
    @Query('page') page: number,
    @GetUser() user: User,
  ) {
    return this.postService.searchMyPostsByTitleAndAddress(query, page, user);
  }

  @Get('/posts/:id')
  getPostById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.postService.getPostById(id, user);
  }

  @Post('/posts')
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user);
  }

  @Delete('/posts/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<number> {
    return this.postService.deletePost(id, user);
  }

  @Patch('/posts/:id')
  @UsePipes(ValidationPipe)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>,
    @GetUser() user: User,
  ) {
    return this.postService.updatePost(id, updatePostDto, user);
  }

  @Get('/posts')
  getPostsByMonth(
    @Query('year') year: number,
    @Query('month') month: number,
    @GetUser() user: User,
  ) {
    return this.postService.getPostsByMonth(year, month, user);
  }

  @Get('/posts/scores/count')
  async getCountByScore(@GetUser() user: User) {
    return this.postService.getPostCountByField(user, 'score');
  }

  @Get('/posts/colors/count')
  async getCountByColor(@GetUser() user: User) {
    return this.postService.getPostCountByField(user, 'color');
  }

  @Get('/posts/friend/:friendId')
  getFriendPosts(
    @Query('page') page: number,
    @Param('friendId', ParseIntPipe) friendId: number,
    @GetUser() user: User,
  ) {
    return this.postService.getFriendPosts(page, friendId, user);
  }

  @Get('/posts/user/:id')
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  getUserPosts(
    @Query('page') page: number,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.postService.getUserPosts(page, userId);
  }

  @Get('/users/posts')
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  getAllPosts(@Query('page') page: number) {
    return this.postService.getAllPosts(page);
  }
}
