import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MarkerController } from './marker.controller';
import { Marker } from './marker.entity';
import { MarkerService } from './marker.service';
import { Image } from 'src/image/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marker, Image]), AuthModule],
  controllers: [MarkerController],
  providers: [MarkerService],
})
export class MarkerModule {}
