import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { AuthModule } from 'src/auth/auth.module';
import { Image } from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), AuthModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
