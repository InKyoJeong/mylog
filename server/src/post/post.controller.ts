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

@Controller()
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  // @Get('')
  // getAllPosts(): Promise<PostEntity[]> {
  //   return this.postService.getAllPosts();
  // }

  @Get('/markers/my')
  getAllMyMarkers(
    @GetUser() user: User,
  ): Promise<
    Pick<PostEntity, 'id' | 'latitude' | 'longitude' | 'color' | 'score'>[]
  > {
    return this.postService.getMyMarkers(user);
  }

  @Get('/posts/my')
  async getMyPosts(@Query('page') page: number, @GetUser() user: User) {
    return this.postService.getMyPosts(page, user);
  }

  @Get('/posts/:id')
  getPostById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.getPostById(id, user);
  }

  @Post('/posts')
  @UsePipes(ValidationPipe)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }

  @Delete('/posts/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.deletePost(id, user);
  }

  @Patch('/posts/:id')
  @UsePipes(ValidationPipe)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ) {
    return this.postService.updatePost(id, createPostDto, user);
  }
}
