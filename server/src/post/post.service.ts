import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/auth/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { Image } from 'src/image/image.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  // async getAllPost(): Promise<Post[]> {
  //   return this.postRepository.find();
  // }

  async getMyMarkers(user: User) {
    const markers = await this.postRepository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId: user.id })
      .select([
        'post.id',
        'post.latitude',
        'post.longitude',
        'post.color',
        'post.score',
      ])
      .getMany();

    return markers;
  }

  async getMyPosts(page: number, user: User): Promise<Post[]> {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.date', 'DESC')
      .skip(offset)
      .take(perPage)
      .leftJoinAndSelect('post.images', 'image')
      .where('post.userId = :userId', { userId: user.id })
      .getMany();

    return posts;
  }

  async getPostById(id: number, user: User): Promise<Post> {
    const foundPost = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.images', 'image')
      .where('post.userId = :userId', { userId: user.id })
      .andWhere('post.id = :id', { id })
      .getOne();

    if (!foundPost) {
      throw new NotFoundException('존재하지 않는 데이터입니다.');
    }

    return foundPost;
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const {
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      score,
      imageUris,
    } = createPostDto;

    const post = this.postRepository.create({
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      score,
      user,
    });
    const images = imageUris.map((uri) => this.imageRepository.create(uri));
    post.images = images;

    await this.imageRepository.save(images);
    await this.postRepository.save(post);

    return post;
  }

  async deletePost(id: number, user: User): Promise<number> {
    const result = await this.postRepository
      .createQueryBuilder('post')
      .delete()
      .from(Post)
      .where('userId = :userId', { userId: user.id })
      .andWhere('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException('존재하지 않는 데이터입니다.');
    }

    return id;
  }

  async updatePost(
    id: number,
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const post = await this.getPostById(id, user);
    const { latitude, longitude, title, description, color, date, score } =
      createPostDto;
    post.latitude = latitude;
    post.longitude = longitude;
    post.title = title;
    post.description = description;
    post.color = color;
    post.date = date;
    post.score = score;
    await this.postRepository.save(post);

    return post;
  }
}
