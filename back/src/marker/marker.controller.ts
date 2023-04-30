import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname, basename } from 'path';

import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { Marker } from './marker.entity';
import { MarkerService } from './marker.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { numbers } from 'src/constants';

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

@Controller('markers')
@UseGuards(AuthGuard())
export class MarkerController {
  constructor(private markerService: MarkerService) {}

  // @Get('')
  // getAllMarker(): Promise<Marker[]> {
  //   return this.markerService.getAllMarker();
  // }

  @Get('/my')
  getAllMyMarkers(@GetUser() user: User): Promise<Marker[]> {
    return this.markerService.getAllMyMarkers(user);
  }

  @Get('/:id')
  getMarkerById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Marker> {
    return this.markerService.getMarkerById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createMarker(
    @Body() createMarkerDto: CreateMarkerDto,
    @GetUser() user: User,
  ): Promise<Marker> {
    return this.markerService.createMarker(createMarkerDto, user);
  }

  @Delete('/:id')
  deleteMarker(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.markerService.deleteMarker(id, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateMarker(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMarkerDto: CreateMarkerDto,
    @GetUser() user: User,
  ) {
    return this.markerService.updateMarker(id, createMarkerDto, user);
  }

  @UseInterceptors(
    FilesInterceptor('images', numbers.MAX_IMAGE_COUNT, {
      storage: diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename(req, file, cb) {
          const ext = extname(file.originalname);
          cb(null, basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: numbers.MAX_IMAGE_SIZE },
    }),
  )
  @Post('/images')
  uploadMarkerImages(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('files', files);
  }
}
