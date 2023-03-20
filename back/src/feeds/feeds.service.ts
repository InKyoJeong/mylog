import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedsService {
  private feeds = [];

  getAllFeeds() {
    return this.feeds;
  }
}
