import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';

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

  private async getMyPostsBaseQuery(
    user: User,
  ): Promise<SelectQueryBuilder<Post>> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.images', 'image')
      .where('post.userId = :userId', { userId: user.id })
      .orderBy('post.date', 'DESC')
      .addOrderBy('image.id', 'ASC');
  }

  async getMyPosts(page: number, user: User): Promise<Post[]> {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const queryBuilder = await this.getMyPostsBaseQuery(user);
    const posts = await queryBuilder.skip(offset).take(perPage).getMany();

    return posts;
  }

  async searchMyPostsByTitleAndAddress(
    query: string,
    page: number,
    user: User,
  ): Promise<Post[]> {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const queryBuilder = await this.getMyPostsBaseQuery(user);
    const posts = await queryBuilder
      .andWhere(
        new Brackets((qb) => {
          qb.where('post.title like :query', { query: `%${query}%` });
          qb.orWhere('post.address like :query', { query: `%${query}%` });
        }),
      )
      .skip(offset)
      .take(perPage)
      .getMany();

    return posts;
  }

  async getPostById(id: number, user: User) {
    const foundPost = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.images', 'image')
      .leftJoinAndSelect(
        'post.favorites',
        'favorite',
        'favorite.userId = :userId',
        { userId: user.id },
      )
      .where('post.userId = :userId', { userId: user.id })
      .andWhere('post.id = :id', { id })
      .getOne();

    if (!foundPost) {
      throw new NotFoundException('존재하지 않는 데이터입니다.');
    }

    const { favorites, ...rest } = foundPost;
    const postWithIsFavorite = { ...rest, isFavorite: favorites.length > 0 };

    return postWithIsFavorite;
  }

  async createPost(createPostDto: CreatePostDto, user: User) {
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

    const { user: _, ...postWithoutUser } = post;
    return postWithoutUser;
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
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>,
    user: User,
  ) {
    const post = await this.getPostById(id, user);
    const { title, description, color, date, score, imageUris } = updatePostDto;
    post.title = title;
    post.description = description;
    post.color = color;
    post.date = date;
    post.score = score;

    const images = imageUris.map((uri) => this.imageRepository.create(uri));
    post.images = images;

    await this.imageRepository.save(images);
    await this.postRepository.save(post);

    return post;
  }

  async getPostsByMonth(year: number, month: number, user: User) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId: user.id })
      .andWhere('extract(year from post.date) = :year', { year })
      .andWhere('extract(month from post.date) = :month', { month })
      .select(['post.id', 'post.title', 'post.address'])
      .getMany();

    return posts;
  }
}
