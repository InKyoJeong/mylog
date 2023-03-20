import { IsNotEmpty, IsString } from 'class-validator';
import { FeedTag } from '../feed.model';

export class CreateFeedDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  tag: FeedTag;
}
