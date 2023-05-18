import { IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  email: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
