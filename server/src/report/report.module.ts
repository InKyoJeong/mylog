import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportController } from './report.controller';
import { Report } from './report.entity';
import { Post } from 'src/post/post.entity';
import { ReportService } from './report.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Post]), AuthModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
