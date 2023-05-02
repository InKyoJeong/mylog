import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname, basename } from 'path';

import { FilesInterceptor } from '@nestjs/platform-express';
import { numbers } from 'src/constants';

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('create uploads folder');
  fs.mkdirSync('uploads');
}

@Controller('images')
@UseGuards(AuthGuard())
export class ImageController {
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
  @Post('/')
  uploadMarkerImages(@UploadedFiles() files: Express.Multer.File[]) {
    const uris = files.map((file) => file.filename);

    return uris;
  }
}
