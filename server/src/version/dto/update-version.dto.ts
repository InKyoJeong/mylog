import { IsString } from 'class-validator';

export class UpdateVersionDto {
  @IsString()
  versionIOS: string;

  @IsString()
  versionAndroid: string;
}
