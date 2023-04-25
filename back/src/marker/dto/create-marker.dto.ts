import { IsNotEmpty, IsString } from 'class-validator';
import { MarkerColor } from '../marker-color.enum';

export class CreateMarkerDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  color: MarkerColor;

  @IsString()
  address: string;

  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;
}
