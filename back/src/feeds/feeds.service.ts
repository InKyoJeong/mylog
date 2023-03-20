import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed, FeedTag } from './feed.model';

@Injectable()
export class FeedsService {
  private feeds: Feed[] = [];

  getAllFeeds(): Feed[] {
    return this.feeds;
  }

  createFeed(createFeedDto: CreateFeedDto) {
    const { title, description } = createFeedDto;

    const feed: Feed = {
      id: String(Date.now()),
      title,
      description,
      tag: FeedTag.RED,
    };

    this.feeds.push(feed);
    return feed;
  }
}
