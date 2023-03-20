import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './feed.model';

@Injectable()
export class FeedsService {
  private feeds: Feed[] = [];

  getAllFeeds(): Feed[] {
    return this.feeds;
  }

  getFeedById(id: string): Feed {
    const foundFeed = this.feeds.find((feed) => feed.id === id);

    if (!foundFeed) {
      throw new NotFoundException('존재하지 않는 피드입니다.');
    }

    return foundFeed;
  }

  createFeed(createFeedDto: CreateFeedDto) {
    const { title, description, tag } = createFeedDto;

    const feed: Feed = {
      id: String(Date.now()),
      title,
      description,
      tag,
    };

    this.feeds.push(feed);
    return feed;
  }

  deleteFeed(id: string): void {
    const foundFeed = this.getFeedById(id);
    this.feeds = this.feeds.filter((feed) => feed.id !== foundFeed.id);
  }

  updateFeed(id: string, createFeedDto: CreateFeedDto): Feed {
    const foundFeed = this.getFeedById(id);
    const { title, description, tag } = createFeedDto;
    foundFeed.title = title;
    foundFeed.description = description;
    foundFeed.tag = tag;

    return foundFeed;
  }
}
