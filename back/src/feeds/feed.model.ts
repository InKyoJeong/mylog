export interface Feed {
  id: string;
  title: string;
  description: string;
  tag: FeedTag;
}

export enum FeedTag {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
}
