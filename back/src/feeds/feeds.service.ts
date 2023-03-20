import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { Feed } from './feed.model';

@Injectable()
export class FeedsService {
  private feeds: Feed[] = [];

  getAllFeeds(): Feed[] {
    return this.feeds;
  }

  getFeedById(id: string): Feed {
    return this.feeds.find((feed) => feed.id === id);
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
    this.feeds = this.feeds.filter((feed) => feed.id !== id);
  }

  updateFeed(id: string, createFeedDto: CreateFeedDto): Feed {
    const feed = this.getFeedById(id);
    const { title, description, tag } = createFeedDto;
    feed.title = title;
    feed.description = description;
    feed.tag = tag;

    return feed;
  }
}
