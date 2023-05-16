import { IsNotEmpty } from 'class-validator';

export class ToggleFavoriteDto {
  @IsNotEmpty()
  postId: number;
}
