import { Injectable } from '@nestjs/common';
import { Feed, FeedTag } from './feed.model';

@Injectable()
export class FeedsService {
  private feeds: Feed[] = [];

  getAllFeeds(): Feed[] {
    return this.feeds;
  }

  createFeed(title: string, description: string) {
    const feed: Feed = {
      id: '2',
      title,
      description,
      tag: FeedTag.RED,
    };

    this.feeds.push(feed);
    return feed;
  }
}
