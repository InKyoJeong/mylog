import { IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  postId: number;
}
