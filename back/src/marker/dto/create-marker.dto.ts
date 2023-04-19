import { IsNotEmpty, IsString } from 'class-validator';
import { MarkerType } from '../marker-type.enum';

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
  markerType: MarkerType;
}
