import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private feedRepository: Repository<Feed>,
  ) {}

  async getAllFeed(): Promise<Feed[]> {
    return this.feedRepository.find();
  }

  async getAllMyFeed(user: User): Promise<Feed[]> {
    const feeds = await this.feedRepository
      .createQueryBuilder('feed')
      .where('feed.userId = :userId', { userId: user.id })
      .getMany();

    return feeds;
  }

  async getFeedById(id: number): Promise<Feed> {
    const foundFeed = await this.feedRepository.findOneBy({ id });

    if (!foundFeed) {
      throw new NotFoundException('존재하지 않는 피드입니다.');
    }

    return foundFeed;
  }

  async createFeed(createFeedDto: CreateFeedDto, user: User): Promise<Feed> {
    const { title, description, tag } = createFeedDto;
    const feed = this.feedRepository.create({
      title,
      description,
      tag,
      user,
    });

    await this.feedRepository.save(feed);
    return feed;
  }

  async deleteFeed(id: number): Promise<void> {
    const result = await this.feedRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('존재하지 않는 피드입니다.');
    }
  }

  async updateFeed(id: number, createFeedDto: CreateFeedDto): Promise<Feed> {
    const feed = await this.getFeedById(id);
    const { title, description, tag } = createFeedDto;
    feed.title = title;
    feed.description = description;
    feed.tag = tag;
    await this.feedRepository.save(feed);

    return feed;
  }
}
