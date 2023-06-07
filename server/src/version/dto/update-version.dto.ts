import { IsString } from 'class-validator';

export class UpdateVersionDto {
  @IsString()
  ios: string;

  @IsString()
  android: string;
}
