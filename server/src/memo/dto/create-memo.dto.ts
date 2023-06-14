import { IsString } from 'class-validator';

export class CreateMemoDto {
  @IsString()
  text: string;
}
