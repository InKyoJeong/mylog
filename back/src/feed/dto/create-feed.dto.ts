import { IsNotEmpty, IsString } from 'class-validator';
import { FeedTag } from '../feed-tag.enum';

export class CreateFeedDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  tag: FeedTag;
}
