import { IsNotEmpty, IsString } from 'class-validator';
import { MarkerColor } from '../marker-color.enum';

export class CreateMarkerDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  color: MarkerColor;
}
