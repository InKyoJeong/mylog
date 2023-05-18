import { IsEmail, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsEmail()
  email: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
